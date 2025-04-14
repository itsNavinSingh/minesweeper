#[derive(Clone, Copy, PartialEq)]
pub enum CellState{
    Hidden,
    Flaged,
    Shown,
}

#[derive(Clone, Copy, PartialEq)]
pub enum CellValue {
    Mine,
    Adjacent(u8),
}

#[derive(Clone, Copy, PartialEq)]
pub struct Cell {
    pub state: CellState,
    pub value: CellValue,
}