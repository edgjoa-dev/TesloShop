
export const format = ( value: number ) => {

    const formatter = new Intl.NumberFormat('es-MX',{
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return formatter.format(value);
}