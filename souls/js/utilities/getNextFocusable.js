import getFocusable from '@/utilities/getFocusable';

function getNextFocusable(element) {
  const allFocusable = getFocusable(document);
  const elementIndex = allFocusable.indexOf(element);

  return allFocusable[elementIndex + 1] || null;
}

export default getNextFocusable;
