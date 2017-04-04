import { expect } from  'chai';
import {generateSuccessResponse, generateErrorResponse} from '../../src/helpers/Response';

describe( 'helpers/Response generateSuccessResponse', function() {
    it('generateSuccessResponse Full', () => {
        expect(JSON.stringify(generateSuccessResponse({
            data: {Users: [{id: 1, firstName: 'First1'}]}
        }))).to.be.eq('{"statusCode":200,"body":"{\\"data\\":{\\"Users\\":[{\\"id\\":1,\\"firstName\\":\\"First1\\"}]}}","headers":{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":true}}');
    });

    it('generateSuccessResponse Empty', () => {
        expect(JSON.stringify(generateSuccessResponse())).to.be.eq('{"statusCode":200,"headers":{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":true}}');
    });
});


describe( 'helpers/Response generateErrorResponse', function() {
    it('generateErrorResponse Full', () => {
        expect(JSON.stringify(generateErrorResponse({
            error: 'Banned'
        }, 502))).to.be.eq('{"statusCode":502,"body":"{\\"error\\":\\"Banned\\"}","headers":{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":true}}');
    });

    it('generateErrorResponse Empty', () => {
        expect(JSON.stringify(generateErrorResponse())).to.be.eq('{"statusCode":200,"body":"{\\"error\\":\\"Middleware. Unknown error\\"}","headers":{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":true}}');
    });
});