import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':

        return payOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })
        }

    }

    const getPaypalBearerToken = async(): Promise<string | null> => {

        const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
        const PAYPAL_SECRET    = process.env.PAYPAL_SECRET;

        const body = new URLSearchParams( 'grant_type=client_credentials' );

        try {

            const {data} = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })

        } catch (error) {

        }

    }


    const  payOrder = (req: NextApiRequest, res: NextApiResponse<Data>) => {

        return res.status(200).json({ message: 'Orden pagada' })

}
