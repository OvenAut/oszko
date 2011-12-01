//
//  wf
//
//  Created by Oliver Oszko on 2011-11-29.
//  Copyright (c) 2011 __MyCompanyName__. All rights reserved.
//

var time = new Date();
WebFontConfig = {
  // google: { families: [ 'Poller+One::latin','Droid Sans Mono', 'IM Fell English','Signika' ] },
  google: { families: [ 'Poller+One::latin'] },
	active: function(){
				draw2();

	},
};


(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
