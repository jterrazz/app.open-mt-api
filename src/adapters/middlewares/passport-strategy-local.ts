import { AuthenticateUserWithEmail } from '@application/use-cases/authentication/authenticate-user-with-email';
import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { Strategy } from 'passport-local';

// Call it with passport.authenticate('local');

export const passportStrategyLocalFactory = (
    authenticateUserWithEmail: AuthenticateUserWithEmail,
) => {
    return new Strategy(
        { passwordField: 'password', usernameField: 'email' },
        async function (email, password, done) {
            const userEntity = await authenticateUserWithEmail(
                email,
                password,
            ).catch((error) => {
                if (error instanceof AuthenticationRequiredError) {
                    return done(null, false);
                }

                done(error);
            });

            done(null, userEntity);
        },
    );
};
