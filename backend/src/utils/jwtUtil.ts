import jwt from 'jsonwebtoken';

interface TokenPayload { 
    userId: string;
    role:string
}

export const generateAccessToken= (payload : TokenPayload)=>{
     return jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {expiresIn : "15m"}
      );
};

export const verifyAccessToken= (token : string)=>{
    return jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET!,
    )as unknown as TokenPayload;
};
export const verifyRefreshToken = (token: string) => {
    return jwt.verify(
        token, 
        process.env.REFRESH_TOKEN_SECRET!,
    )as unknown as { userId: string };
};

export const generateRefreshToken = (userId : string) =>{
    return jwt.sign(
                { userId },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: "7d" }
        );

};