import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import {
  Card,
  Card__body
} from '@molecules/Card/Card';

import { Tabs, Tabs__section } from '@molecules/Tabs/Tabs';

export const Guide__welcome = () => {
  const classStack = Utils.createClassStack([
    'guide__welcome'
  ]);

  return (
    <Rhythm tagName="section" className={classStack}>
      <Tabs className="card__deck" defaultTab={false}>
        <Card className="tabs__trigger fall-flip" color="green">
          <Card__body className="js-size" tagName="h2" />
        </Card>
        <Tabs__section>
          <Card>
            <Card__body className="atomic-js" />
          </Card>
          <Card className="chart-container">
            <Card__body>
              <canvas id="js-chart" />
            </Card__body>
          </Card>
        </Tabs__section>

        <Card className="tabs__trigger fall-flip" color="green">
          <Card__body className="css-size" tagName="h2" />
        </Card>
        <Tabs__section>
          <Card>
            <Card__body className="atomic-css" />
          </Card>
          <Card className="chart-container">
            <Card__body>
              <canvas id="css-chart" />
            </Card__body>
          </Card>
        </Tabs__section>
        {
          (process.env.NODE_ENV === 'development')
            ? (
              <React.Fragment>
                <Card className="tabs__trigger fall-flip builds">
                  <Card__body className="total-builds" tagName="h2" />
                </Card>
                <Tabs__section />

                <Card color="red" className="tabs__trigger fall-flip errors">
                  <Card__body className="total-errors" tagName="h2" />
                </Card>
                <Tabs__section />
              </React.Fragment>
            )
            : ''
        }
      </Tabs>
      <Heading>Welcome to Unslated!</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Getting Started</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Elements and Examples</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Pages</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Templates</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Build configs</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Guide</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Scaffolding</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Documentation</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Adding a JS plugins</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Adding a CSS plugin</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
      <Heading level="h3">Adding routes </Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>
    </Rhythm>
  );
};


export default Guide__welcome;
