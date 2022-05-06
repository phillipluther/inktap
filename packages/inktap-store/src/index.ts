import createSubstore from '@src/create-substore';

const tags = createSubstore('tags');

const newTag = tags.create({
  this: 'that',
  another: true,
  cat: 'hat',
  number: 1,
});

tags.create({
  this: 'that2',
  another: true,
  cat: 'hat',
  number: 2,
});

tags.create({
  this: 'that3',
  another: true,
  cat: false,
  number: 3,
});

console.log(tags.get(newTag.id));

const found = tags.find({ cat: 'hat' });

console.log('FOUND?', found);
