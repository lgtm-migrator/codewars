import { fullList } from '../fullList';
import { Developer, LanguageCounts } from '../types';
import { countLanguages } from './part5';

type TestCase = [Developer[], LanguageCounts];

describe(countLanguages.name, () => {
    const testCase1: TestCase = [
        [
            {
                firstName: 'Noah',
                lastName: 'M.',
                country: 'Switzerland',
                continent: 'Europe',
                age: 19,
                language: 'C',
            },
            {
                firstName: 'Anna',
                lastName: 'R.',
                country: 'Liechtenstein',
                continent: 'Europe',
                age: 52,
                language: 'JavaScript',
            },
            {
                firstName: 'Ramon',
                lastName: 'R.',
                country: 'Paraguay',
                continent: 'Americas',
                age: 29,
                language: 'Ruby',
            },
            {
                firstName: 'George',
                lastName: 'B.',
                country: 'England',
                continent: 'Europe',
                age: 81,
                language: 'C',
            },
        ],
        { C: 2, JavaScript: 1, Ruby: 1 },
    ];

    const testCaseFullList: TestCase = [
        fullList,
        {
            C: 10,
            Clojure: 8,
            Java: 16,
            JavaScript: 15,
            PHP: 8,
            Python: 20,
            Ruby: 20,
        },
    ];

    const testCaseNull: TestCase = [
        [
            {
                firstName: 'Noah',
                lastName: 'M.',
                country: 'Switzerland',
                continent: 'Europe',
                age: 19,
                language: null,
            },
            {
                firstName: 'Anna',
                lastName: 'R.',
                country: 'Liechtenstein',
                continent: 'Europe',
                age: 52,
                language: null,
            },
            {
                firstName: 'Ramon',
                lastName: 'R.',
                country: 'Paraguay',
                continent: 'Americas',
                age: 29,
                language: null,
            },
            {
                firstName: 'George',
                lastName: 'B.',
                country: 'England',
                continent: 'Europe',
                age: 81,
                language: null,
            },
        ],
        {},
    ];

    it.each([testCase1, testCaseFullList, testCaseNull])(
        'should count the languages %o, languages: %j',
        (developers, languageCount) => {
            expect(countLanguages(developers)).toEqual(languageCount);
        },
    );
});
