import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

const re = /(\S+)\s+(\S+)/;

function parseAuthHeader(hdrValue) {
  if (typeof hdrValue !== 'string') {
    return null;
  }
  const matches = hdrValue.match(re);
  return matches && { scheme: matches[1], value: matches[2] };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // (request: any) => {
        //   let token = null;
        //   if (request.headers['authorization']) {
        //     const auth_params = parseAuthHeader(
        //       request.headers['authorization'],
        //     );
        //     if (auth_params && 'bearer' === auth_params.scheme.toLowerCase()) {
        //       token = auth_params.value;
        //     }
        //   }
        //   return token;
        // },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('apps.auth.jwt_secret'),
    });
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
