/*
  Example:
    ```
      examples: [{
        name: 'Default styling',
        component: (
          <div className={{name}}></div>
        ),
      },
    ```
*/

export default [{
  examples: [
    {
      name: 'Default styling',
      component: (
        <div className="{{name}}">Lorem ipsum</div>
      ),
      devNotes: ''
    }
  ]
}];
