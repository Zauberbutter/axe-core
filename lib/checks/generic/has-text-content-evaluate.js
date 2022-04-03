import { sanitize, subtreeText } from '../../commons/text';

function hasTextContentEvaluate(node, options, virtualNode) {
  let subtreeTextResult;

  try {
    subtreeTextResult = sanitize(subtreeText(virtualNode));
  } catch (e) {
    return undefined;
  }

  if (subtreeTextResult !== '') {
    return true;
  }

  if (!virtualNode.children) {
    return false;
  }

  const imageNodes = virtualNode.children.filter(({ props }) => {
    return ['IMG', 'INPUT', 'AREA'].includes(props.nodeName.toUpperCase());
  });

  if (!imageNodes.length > 0) {
    return false;
  }

  const imageNodeWithAlt = imageNodes.find(virtualNode => {
    return virtualNode.attr('alt') && virtualNode.attr('alt').length > 0;
  });

  if (!imageNodeWithAlt) {
    this.data();
    return false;
  }
}

export default hasTextContentEvaluate;
