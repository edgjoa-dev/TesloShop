import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return searchProducts(req, res)


        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

    let {q = ''} = req.query

    if(q.length === 0 ){
        res.status(400).json({
            message: 'Debe especificar el query de búsqueda.'
        });
    }


    q = q.toString().toLowerCase();

    return res.status(200).json({
        message: q.toString()
    })
}
