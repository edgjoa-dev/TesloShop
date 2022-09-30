import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

    export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

        switch (req.method) {
            case 'POST':
                return createOrder( req, res );

            default:
                return res.status(404).json({ message: 'Invalid method' });
        }

    }

    function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {

        const body = req.body;

        


        res.status(200).json(body);
}
