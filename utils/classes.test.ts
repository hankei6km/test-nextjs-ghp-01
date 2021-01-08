import { pruneClasses } from './classes';

describe('pruneClassess()', () => {
  it('should prune className that is not exist in classNames array', () => {
    const classes = {
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title',
      'EFG-root': 'efg-root',
      'EFG-title': 'efg-title'
    };
    const className = ['ABC-root', 'ABC-title'];
    expect(pruneClasses(classes, className)).toStrictEqual({
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title'
    });
  });
  it('should prune classNames that is not exist in classes object', () => {
    const classes = {
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title',
      'EFG-root': 'efg-root',
      'EFG-title': 'efg-title'
    };
    const className = ['ABC-root', 'ABC-title', 'HIJ-root'];
    expect(pruneClasses(classes, className)).toStrictEqual({
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title'
    });
  });
  it('should accespt classes is empty', () => {
    const classes = {};
    const className = ['ABC-root', 'ABC-title'];
    expect(pruneClasses(classes, className)).toStrictEqual({});
  });
  it('should accespt classNames is empty', () => {
    const classes = {
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title',
      'EFG-root': 'efg-root',
      'EFG-title': 'efg-title'
    };
    const className = [];
    expect(pruneClasses(classes, className)).toStrictEqual({});
  });
  it('should accespt classes===undefined', () => {
    const className = ['ABC-root', 'ABC-title'];
    expect(pruneClasses(undefined, className)).toStrictEqual({});
  });
});
