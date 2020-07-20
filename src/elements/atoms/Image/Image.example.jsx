/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      export default [{
        name: 'Default styling',
        component: (
          <Component>Lorem ipsum</Component>
        ),
        options: {
          padding: '1rem',
          background: 'path/or/url/to/image(.jpg|.gif|.png|.svg)',
          brightness: 0.5,
        }
      },
    ```
*/

import Heading from '@atoms/Heading/Heading';
import imageSrc from '@atoms/Image/assets/rancheria-falls.jpg';
import imageSrcMd from '@atoms/Image/assets/rancheria-falls-md.jpg';
import imageSrcLg from '@atoms/Image/assets/rancheria-falls-lg.jpg';
import Image from './Image';

export default [{
  examples: [
    {
      name: 'Auto inline vs. full width',
      component: (
        <React.Fragment>
          <Image
            src={imageSrc}
            variant="auto"
            alt="Rancheria Falls"
          />

          <Image
            src={imageSrc}
            variant="full"
            alt="Rancheria Falls"
          />
        </React.Fragment>
      )
    }, {
      name: 'Image srcset (uses <picture> with IE11 fallback)',
      component: (
        <Image
          src={imageSrc}
          srcSet={`${imageSrcMd} 720w, ${imageSrcLg} 1440w`}
          alt="Rancheria Falls"
          variant="full"
        />
      )
    }, {
      name: 'Image as background of a container',
      component: (
        <Image
          src={imageSrc}
          size="100%"
          position="center"
          className="padding--medium"
        >
          <Heading level="h2">Hello World!</Heading>
          <p>Well this is neat!</p>
        </Image>
      )
    }
  ]
}];
