import Heading from '@atoms/Heading/Heading';

/**
  Expand is a molecule used to hide or display conent under a given title.
*/

export class Expand extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Icon name */
    icon: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default', 'purple', 'navy', 'gold']),
    /** Expand trigger heading */
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    /** Children passed through */
    children: PropTypes.node,
    /** Default state determins if a expand should be open or closed at page load */
    defaultState: PropTypes.oneOf(['open', 'closed']),
    /** Level defines the heading tag size (h1 - h6) of the expand trigger */
    level: PropTypes.string,
    /** Aligns expand target to be top or bottom */
    align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** Descriptive accessible ID required for corresponding aria-labelledBy */
    id: PropTypes.string.isRequired
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    icon: 'plus',
    defaultState: 'closed',
    level: 'h3',
    align: 'top'
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      title,
      children,
      icon,
      defaultState,
      level,
      align,
      id,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'expand',
      `expand--${variant}`,
      `expand-state--${defaultState}`,
      `expand-align--${align}`,
      className
    ]);

    const expanded = defaultState !== 'closed';

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        <Heading tagName="button" level={level} className="expand__trigger" aria-expanded={expanded} id={`${id}ExpandTitle`} aria-controls={`${id}ExpandDesc`}>{title}</Heading>
        <section className="expand__target" aria-hidden={!expanded} id={`${id}ExpandDesc`} aria-labelledBy={`${id}ExpandTitle`}>
          {children}
        </section>
      </Tag>
    );
  }
}

export default Expand;
