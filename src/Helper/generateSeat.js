const generateSeats = (capacity) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    const seatsPerRow = 10;
    const seats = [];

    let seatsCreated = 0;
    let rowIndex = 0;

    while (seatsCreated < capacity) {
        const rowLabel = rows[rowIndex % rows.length];
        // If we run out of letters, we might append numbers or double letters, 
        // but for this simple helper we'll just loop or stick to rowLabel

        // Let's make it simple: fill up to 10 seats or remaining capacity
        const remaining = capacity - seatsCreated;
        const colCount = Math.min(seatsPerRow, remaining);

        for (let i = 1; i <= colCount; i++) {
            seats.push({
                number: `${rowLabel}${i}`,
                isBooked: false // default
            });
            seatsCreated++;
        }
        rowIndex++;
    }
    return seats;
};

export default generateSeats;
