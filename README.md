# antiaris-logger
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

日志。

```js
import logger, {info, data, help, debug, warn, error} from 'antiaris-logger';

logger.setLevel('log');

logger.setOutStream(fs.createWriteStream('/log.log', {flags: 'a'});)

info('record info message');
data('record data message');
help('record help message');
debug('record debug message');
warn('record warn message');
error('record error message').then(()=>{
    // record complete
});

```


[npm-url]: https://npmjs.org/package/antiaris-logger
[downloads-image]: http://img.shields.io/npm/dm/antiaris-logger.svg
[npm-image]: http://img.shields.io/npm/v/antiaris-logger.svg
[david-dm-url]:https://david-dm.org/antiaris/antiaris-logger
[david-dm-image]:https://david-dm.org/antiaris/antiaris-logger.svg
[david-dm-dev-url]:https://david-dm.org/antiaris/antiaris-logger#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/antiaris/antiaris-logger/dev-status.svg
