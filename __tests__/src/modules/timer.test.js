const upTimer = require('../../../src/modules/timer.js');

const say = jest.fn();

const input = {
    token: 'VHriEuGVXp8ptnrWyRRBbjom',
    team_id: 'T01AK5QP3C1',
    team_domain: 'katesspace-workspace',
    channel_id: 'C019ZQMTXU6',
    channel_name: 'custombot',
    user_id: 'U01A6GQHFGA',
    user_name: 'kshydlovska',
    command: '/settimer',
    text: '',
    api_app_id: 'A01AWD35QJC',
    response_url: 'https://hooks.slack.com/commands/T01AK5QP3C1/1374110343792/iXBxmIGluS99hf2UYGoD0UKj',
    trigger_id: '1347185056581.1359194785409.c3a9f29bb1f54cad5bfd126f3e0ad756'
};

const inputForAnotherUser = {
    token: 'VHriEuGVXp8ptnrWyRRBbjom',
    team_id: 'T01AK5QP3C1',
    team_domain: 'katesspace-workspace',
    channel_id: 'C019ZQMTXU6',
    channel_name: 'custombot',
    user_id: 'U01A6GQHFGA',
    user_name: 'kshydlovska',
    command: '/settimer',
    text: ' for @someone',
    api_app_id: 'A01AWD35QJC',
    response_url: 'https://hooks.slack.com/commands/T01AK5QP3C1/1374110343792/iXBxmIGluS99hf2UYGoD0UKj',
    trigger_id: '1347185056581.1359194785409.c3a9f29bb1f54cad5bfd126f3e0ad756'
};

describe('Testing Timer Module: ', () => {


    describe('set timer method: ', () => {

        it('Should return correct message to user if user set up timer to themself ', () => {
            upTimer.setTimer(input, say);
            expect(say).toHaveBeenLastCalledWith(`<@${input.user_name}> your timer is set.`);
        });

        it('Should return correct message to user if user set up timer to someone else', () => {
            upTimer.setTimer(inputForAnotherUser, say);
            expect(say).toHaveBeenLastCalledWith(`<@someone>,  <@kshydlovska> just started timer for you.`);
        });
    });


    describe('get timer method: ', () => {

        it('Should return correct message to user if user wants to get timer to themself ', () => {
            upTimer.setTimer(input, say);
            let newSay = jest.fn();
            upTimer.getTimer(input, newSay);
            expect(newSay).toHaveBeenLastCalledWith(` <@kshydlovska>  your current time is `);

        });

        it('Should return correct message to user if user wants to get timer to someone else', () => {
            upTimer.setTimer(inputForAnotherUser, say);
            let newSay = jest.fn();
            upTimer.getTimer(inputForAnotherUser, newSay);
            expect(newSay).toHaveBeenLastCalledWith(` <@someone>  your current time is `);
        });

        it('Should return correct message to user if user wants to get timer, but didnt set up it yet', () => {
            let newInput = {
                token: 'VHriEuGVXp8ptnrWyRRBbjom',
                team_id: 'T01AK5QP3C1',
                team_domain: 'katesspace-workspace',
                channel_id: 'C019ZQMTXU6',
                channel_name: 'custombot',
                user_id: 'random',
                user_name: 'kshydlovskaya',
                command: '/gettimer',
                text: '',
                api_app_id: 'A01AWD35QJC',
                response_url: 'https://hooks.slack.com/commands/T01AK5QP3C1/1356720109860/ffbyXR9WlnkhF1oiqmyfndNv',
                trigger_id: '1350738958883.1359194785409.cf4731ea92b8970f396aea0ffe7d9288'
            };
            let getsay = jest.fn();

            upTimer.getTimer(newInput, getsay);
            expect(getsay).toHaveBeenLastCalledWith(`Timer for <@kshydlovskaya> is not set yet.`);
        });

        it('Should return correct message to user if user wants to get timer for someone else, but didnt set up it yet', () => {
            let inputForAnotherUser_Two = {
                token: 'VHriEuGVXp8ptnrWyRRBbjom',
                team_id: 'T01AK5QP3C1',
                team_domain: 'katesspace-workspace',
                channel_id: 'C019ZQMTXU6',
                channel_name: 'custombot',
                user_id: 'U01A6GQHFGA..',
                user_name: 'kshydlovska',
                command: '/settimer',
                text: ' for @someones',
                api_app_id: 'A01AWD35QJC',
                response_url: 'https://hooks.slack.com/commands/T01AK5QP3C1/1374110343792/iXBxmIGluS99hf2UYGoD0UKj',
                trigger_id: '1347185056581.1359194785409.c3a9f29bb1f54cad5bfd126f3e0ad756'
            };
            let getsay = jest.fn();

            upTimer.getTimer(inputForAnotherUser_Two, getsay);
            expect(getsay).toHaveBeenLastCalledWith(`Timer for <@someones> is not set yet.`);
        });
    });


    describe('stop timer method: ', () => {


        it('Should return correct message to user if user wants to stop timer to themself ', () => {
            upTimer.setTimer(input, say);
            let newSay = jest.fn();
            upTimer.stopTimer(input, newSay);
            expect(newSay).toHaveBeenLastCalledWith("<@kshydlovska> spent ");

        });

        it('Should return correct message to user if user wants to stop timer to someone else', () => {
            upTimer.setTimer(inputForAnotherUser, say);
            let newSay = jest.fn();
            upTimer.stopTimer(inputForAnotherUser, newSay);
            expect(newSay).toHaveBeenLastCalledWith(`<@someone> spent `);
        });

        let newInput = {
            token: 'VHriEuGVXp8ptnrWyRRBbjom',
            team_id: 'T01AK5QP3C1',
            team_domain: 'katesspace-workspace',
            channel_id: 'C019ZQMTXU6',
            channel_name: 'custombot',
            user_id: 'random_user',
            user_name: 'kshydlovskaya',
            command: '/gettimer',
            text: '',
            api_app_id: 'A01AWD35QJC',
            response_url: 'https://hooks.slack.com/commands/T01AK5QP3C1/1356720109860/ffbyXR9WlnkhF1oiqmyfndNv',
            trigger_id: '1350738958883.1359194785409.cf4731ea92b8970f396aea0ffe7d9288'
        };
        let stopsay = jest.fn();

        upTimer.stopTimer(newInput, stopsay);
        expect(stopsay).toHaveBeenLastCalledWith(`Timer for <@kshydlovskaya> is not set yet.`);

        it('Should return correct message to user if user wants to stop timer for someone else, but didnt set up it yet', () => {
            let inputForAnotherUser_Two = {
                token: 'VHriEuGVXp8ptnrWyRRBbjom',
                team_id: 'T01AK5QP3C1',
                team_domain: 'katesspace-workspace',
                channel_id: 'C019ZQMTXU6',
                channel_name: 'custombot',
                user_id: 'U01A6GQHFGA..',
                user_name: 'kshydlovska',
                command: '/settimer',
                text: ' for @someones',
                api_app_id: 'A01AWD35QJC',
                response_url: 'https://hooks.slack.com/commands/T01AK5QP3C1/1374110343792/iXBxmIGluS99hf2UYGoD0UKj',
                trigger_id: '1347185056581.1359194785409.c3a9f29bb1f54cad5bfd126f3e0ad756'
            };
            let stoPsay = jest.fn();

            upTimer.stopTimer(inputForAnotherUser_Two, stoPsay);
            expect(stoPsay).toHaveBeenLastCalledWith(`Timer for <@someones> is not set yet.`);
        });

        it('Should return correct message to user if user wants to stop timer for someone else, but didnt set up it yet', () => {
            let inputForAnotherUser_Three = {
                token: 'VHriEuGVXp8ptnrWyRRBbjom',
                team_id: 'T01AK5QP3C1',
                team_domain: 'katesspace-workspace',
                channel_id: 'C019ZQMTXU6',
                channel_name: 'custombot',
                user_id: 'U01A6GQHFGA..',
                user_name: 'kshydlovskayak',
                command: '/settimer',
                text: ' for @randomUser',
                api_app_id: 'A01AWD35QJC',
                response_url: 'https://hooks.slack.com/commands/T01AK5QP3C1/1374110343792/iXBxmIGluS99hf2UYGoD0UKj',
                trigger_id: '1347185056581.1359194785409.c3a9f29bb1f54cad5bfd126f3e0ad756'
            };
            upTimer.setTimer(inputForAnotherUser_Three, say);
            let inputStopForAnotherUser = {
                token: 'VHriEuGVXp8ptnrWyRRBbjom',
                team_id: 'T01AK5QP3C1',
                team_domain: 'katesspace-workspace',
                channel_id: 'C019ZQMTXU6',
                channel_name: 'custombot',
                user_id: 'U01A6GQHFGA..',
                user_name: 'kshyd',
                command: '/stoptimer',
                text: ' for @randomUser',
                api_app_id: 'A01AWD35QJC',
                response_url: 'https://hooks.slack.com/commands/T01AK5QP3C1/1374110343792/iXBxmIGluS99hf2UYGoD0UKj',
                trigger_id: '1347185056581.1359194785409.c3a9f29bb1f54cad5bfd126f3e0ad756'
            };
            let stoPsay = jest.fn();
            upTimer.stopTimer(inputStopForAnotherUser, stoPsay);
            expect(stoPsay).toHaveBeenLastCalledWith(`Sorry <@kshyd> you cannot perform this operation`);
        });
    });

});


