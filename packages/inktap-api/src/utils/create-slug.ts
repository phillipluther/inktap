import slugify from 'slugify';

export default (str: string): string => {
  let words = str.split(' ');

  if (words.length > 5) {
    words = words.slice(0, 5);
  }
  return slugify(words.join(' ').toLowerCase());
};
