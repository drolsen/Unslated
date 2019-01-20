/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      examples: [{
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

import Textarea from './Textarea';
import Form from '@molecules/Form/Form';
import docs from '!!docgen-loader?htmlDescription!./Textarea';

export default [{
  docs,
  examples: [
    {
      name: 'Textarea (Default stacked bottom)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Basic input label text" type="text" name="text-input" required={true}>
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (Stacked top)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Basic input label text" type="text" name="text-input" align="stacked-top" required={true}>
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (Inline left)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Inline input label text" type="text" name="text-input" align="inline-left" required={true}>
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (Inline right)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Inline input label text" type="text" name="text-input" align="inline-right" required={true}>
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (without label)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea name="test-name" label={false} type="text" name="text-input" required={true}>
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }
  ]
}];
