use rand::{rng, seq::SliceRandom};

use crate::cell;
pub struct Board {
    size: usize,
    cells: Vec<cell::Cell>,
}

impl Board {
    fn new(size: usize) -> Self {
        Board {
            size,
            cells: vec![
                cell::Cell {
                    state: cell::CellState::Hidden,
                    value: cell::CellValue::Adjacent(0),
                };
                size * size
            ],
        }
    }

    fn place_mines(&mut self, mine_count: usize) {
        let mut rng = rng();
        let mut numbers: Vec<usize> = (0..self.size * self.size).collect();
        numbers.shuffle(&mut rng);

        for &num in &numbers[..mine_count] {
            self.cells[num].value = cell::CellValue::Mine;
        }

        // adjacency calculation
        for y in 0..self.size {
            for x in 0..self.size {
                if !matches!(self.cells[y * self.size + x].value, cell::CellValue::Mine) {
                    let count = self.count_adjacent_mines(x, y);
                    self.cells[y * self.size + x].value = cell::CellValue::Adjacent(count);
                }
            }
        }
    }

    fn count_adjacent_mines(&self, x: usize, y: usize) -> u8 {
        let mut count = 0;
        for dy in -1..=1 {
            for dx in -1..=1 {
                if dx == 0 && dy == 0 {
                    continue;
                }
                let (nx, ny) = (x as i32 + dx, y as i32 + dy);
                if nx >= 0 && ny >= 0 && nx < self.size as i32 && ny < self.size as i32 {
                    if matches!(
                        self.cells[ny as usize * self.size + nx as usize].value,
                        cell::CellValue::Mine
                    ) {
                        count += 1;
                    }
                }
            }
        }
        count
    }

    fn initial_show(&mut self) {
        let mut rng = rng();
        let mut numbers: Vec<usize> = (0..self.size * self.size).collect();
        numbers.shuffle(&mut rng);

        let mut count = 0;
        for &num in &numbers {
            match &self.cells[num].value {
                cell::CellValue::Mine => {}
                _ => {
                    self.cells[num].state = cell::CellState::Shown;
                    count += 1;
                }
            }
            if count >= 5 {
                return;
            }
        }
    }
    
    pub fn create_level(size: usize, mine_count: usize) -> Self {
        let mut board = Board::new(size);
        board.place_mines(mine_count);
        board.initial_show();
        board
    }

    pub fn toggle_flag(&mut self, x: usize, y: usize) {
        if x < self.size && y < self.size {
            let idx: usize = y*self.size+x;
            match &self.cells[idx].state {
                cell::CellState::Hidden => {
                    self.cells[idx].state = cell::CellState::Flaged;
                },
                cell::CellState::Flaged => {
                    self.cells[idx].state = cell::CellState::Hidden;
                },
                cell::CellState::Shown => {}
            }
        }
    }
    pub fn dig_cell(&mut self, x: usize, y:usize) -> bool {
        if x < self.size && y < self.size {
            let idx: usize = y*self.size+x;
            if matches!(self.cells[idx].state, cell::CellState::Hidden) {
                if matches!(self.cells[idx].value, cell::CellValue::Mine) {
                    return false;
                } else {
                    self.cells[idx].state = cell::CellState::Shown;
                }
            }
        }
        true
    }
    pub fn is_completed(&self) -> bool {
        for idx in 0..self.size*self.size {
            // all non-mine must be in shown state
            if !matches!(self.cells[idx].value, cell::CellValue::Mine) {
                if matches!(self.cells[idx].state, cell::CellState::Hidden) {
                    return false;
                }
            } else {
                if !matches!(self.cells[idx].state, cell::CellState::Flaged) {
                    return false;
                }
            }
        }
        true
    }
    pub fn get_show_code(&self, x: usize, y: usize) -> u8 {
        // 0-8 = adjacency, 9 = flaged, 10 = hidden
        match &self.cells[y*self.size+x].state {
            cell::CellState::Flaged => 9,
            cell::CellState::Hidden => 10,
            cell::CellState::Shown => {
                match &self.cells[y*self.size+x].value {
                    cell::CellValue::Adjacent(val) => *val,
                    _ => 11,
                }
            }
        }
    }
    pub fn get_final_code(&self, x: usize, y: usize) -> u8 {
        match &self.cells[y*self.size+x].value {
            cell::CellValue::Mine => 11,
            cell::CellValue::Adjacent(val) => *val,
        }
    }
}
