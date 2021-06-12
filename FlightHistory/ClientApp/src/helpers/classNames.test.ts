import {classNames} from "./classNames";

describe('classNames', () => {
    describe('string inputs', () => {
        it.each`
            inputs                      | expectedClassName
            ${[]}                       | ${''}
            ${['classOne']}             | ${'classOne'}
            ${['classOne', 'classTwo']} | ${'classOne classTwo'}
        `('should convert string inputs $inputs to classNames "$expectedClassName"', ({ inputs, expectedClassName }) => {
            expect(classNames(...inputs)).toBe(expectedClassName);
        });
    });
    
    describe('object inputs', () => {
        it.each`
            inputs                                              | expectedClassName
            ${[{ 'classOne': false }]}                          | ${''}
            ${[{ 'classOne': true }]}                           | ${'classOne'}
            ${[{ 'classOne': false, 'classTwo': false }]}       | ${''}
            ${[{ 'classOne': true, 'classTwo': false }]}        | ${'classOne'}
            ${[{ 'classOne': false, 'classTwo': true }]}        | ${'classTwo'}
            ${[{ 'classOne': true, 'classTwo': true }]}         | ${'classOne classTwo'}
            ${[{ 'classOne': false }, { 'classTwo': false }]}   | ${''}
            ${[{ 'classOne': true }, { 'classTwo': false }]}    | ${'classOne'}
            ${[{ 'classOne': false }, { 'classTwo': true }]}    | ${'classTwo'}
            ${[{ 'classOne': true }, { 'classTwo': true }]}     | ${'classOne classTwo'}
        `('should convert object inputs $inputs to classNames "$expectedClassName"', ({ inputs, expectedClassName }) => {
            expect(classNames(...inputs)).toBe(expectedClassName);
        });
    })
});
