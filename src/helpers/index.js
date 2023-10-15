export const handleNullStrings = (string) => {
    return string || 'N/A'
}

export const formatDate = (date) => {
    console.log(date)
    let parts = date.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}