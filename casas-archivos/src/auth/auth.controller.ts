import {
  Controller, Get, Post, Res, Query, Body,
  Session, Redirect
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  usuarios = [
    { username: 'admin', password: 'admin123', nombreCasa: 'Casa Admin' },
    { username: 'jose', password: '1234', nombreCasa: 'Casa José' },
  ];

  @Get('login-vista')
  loginVista(@Res() res: Response, @Query('mensaje') mensaje = '') {
    return res.render('login', { mensaje });
  }

  @Post('login')
  loginPost(
    @Body() body: any,
    @Res() res: Response,
    @Session() session: Record<string, any>
  ) {
    const user = this.usuarios.find(
      u => u.username === body.username && u.password === body.password
    );

    if (!user) {
      return res.redirect('/auth/login-vista?mensaje=Credenciales inválidas');
    }

    session.user = { username: user.username };
    return res.redirect('/auth/sesion');
  }

  @Get('sesion')
  sesion(@Res() res: Response, @Session() session: Record<string, any>) {
    const userSession = session.user;

    if (!userSession) {
      return res.render('sesion', { casa: {} });
    }

    const casa = this.usuarios.find(u => u.username === userSession.username);
    return res.render('sesion', { casa });
  }

  @Get('logout')
  logout(@Session() session: Record<string, any>, @Res() res: Response) {
    session.user = null;
    return res.redirect('/auth/login-vista?mensaje=Sesión cerrada');
  }
}
