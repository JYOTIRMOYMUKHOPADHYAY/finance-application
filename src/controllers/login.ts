import { Request, Response } from "express";

export default class LoginController {

  constructor() {}

  public login(req: Request, res: Response): void {
    const { email, password } = req.body;
    // db.query('SELECT NOW()', (err, res) => {
    //   if (err) {
    //     console.error('Error executing query:', err.message);
    //   } else {
    //     console.log('Query result:', res.rows);
    //   }
    // });
    // Simulate successful authentication logic
    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: { email, password },
    });
}
}
