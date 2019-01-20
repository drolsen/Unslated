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

import Wrapper from './Wrapper';
import docs from '!!docgen-loader?htmlDescription!./Wrapper';

export default [{
  docs,
  examples: [
    {
      name: 'normal wrapper',
      options: {
        noPadding: true
      },
      component: (
        <Wrapper>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea adipisci repudiandae vel ut recusandae voluptatibus molestiae esse aspernatur officia facilis aperiam odit sunt tempora, fugiat nostrum, voluptatem natus, exercitationem illum totam corporis atque veniam rerum et iure. Maxime facere, quidem facilis, aut ullam libero enim suscipit quasi quam expedita ab. Obcaecati enim corporis provident, nihil molestiae dolore et quisquam error at neque omnis nesciunt beatae quae, qui veritatis nobis porro fugit vitae atque, esse. Amet quia nulla consequatur, autem eaque doloremque illo facilis repudiandae nisi obcaecati vero molestias fugit dignissimos ipsa iure alias est quidem deserunt tempore earum, et, officiis?
        </Wrapper>
      )
    }, {
      name: 'narrow wrapper',
      options: {
        noPadding: true
      },
      component: (
        <Wrapper size="narrow">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea adipisci repudiandae vel ut recusandae voluptatibus molestiae esse aspernatur officia facilis aperiam odit sunt tempora, fugiat nostrum, voluptatem natus, exercitationem illum totam corporis atque veniam rerum et iure. Maxime facere, quidem facilis, aut ullam libero enim suscipit quasi quam expedita ab. Obcaecati enim corporis provident, nihil molestiae dolore et quisquam error at neque omnis nesciunt beatae quae, qui veritatis nobis porro fugit vitae atque, esse. Amet quia nulla consequatur, autem eaque doloremque illo facilis repudiandae nisi obcaecati vero molestias fugit dignissimos ipsa iure alias est quidem deserunt tempore earum, et, officiis?
        </Wrapper>
      )
    }, {
      name: 'wide wrapper',
      options: {
        noPadding: true
      },
      component: (
        <Wrapper size="wide">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea adipisci repudiandae vel ut recusandae voluptatibus molestiae esse aspernatur officia facilis aperiam odit sunt tempora, fugiat nostrum, voluptatem natus, exercitationem illum totam corporis atque veniam rerum et iure. Maxime facere, quidem facilis, aut ullam libero enim suscipit quasi quam expedita ab. Obcaecati enim corporis provident, nihil molestiae dolore et quisquam error at neque omnis nesciunt beatae quae, qui veritatis nobis porro fugit vitae atque, esse. Amet quia nulla consequatur, autem eaque doloremque illo facilis repudiandae nisi obcaecati vero molestias fugit dignissimos ipsa iure alias est quidem deserunt tempore earum, et, officiis?
        </Wrapper>
      )
    }
  ]
}];
