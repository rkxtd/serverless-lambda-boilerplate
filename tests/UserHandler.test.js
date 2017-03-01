import LambdaTester from 'lambda-tester';
import * as DTO from '../src/dto/Users';
class UsersDTO {
    fetchUsers (errCB, succCB) {
        console.log('Here');
        succCB([{}, {}, {}]);
    }
}
DTO.default = UsersDTO;
import UserHandler from '../src/userHandler';


describe( 'UserHandler', function() {

    it( 'Fetch All Users', function(done) {


        return LambdaTester( UserHandler.users )
            .event( {} )
            .expectResult(result => {
                console.log('Results found', arguments);
                expect( result.total ).to.equal( 3 );
            });
            // .expectSucceed(result => {
            //     console.log('Success found', arguments);
            //     done();
            // })
            // .expectFail(result => {
            //     console.log('Fail found', arguments);
            //     done();
            // })
            // .expectError(result => {
            //     console.log('Error found', arguments);
            // });
        // done();
    });
});