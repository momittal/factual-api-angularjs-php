<div class="search-container"><div class="row"><div class="col-md-12"><form class="search form-search"><fieldset><input type="text" name="query" placeholder="type what you're looking for" ng-model="query" autofocus="autofocus" class="search-query form-control"/><div ng-controller="collapseController" class="add-container center-justify"><button type="submit" ng-click="getData()" class="btn btn-primary">get data</button><button ng-click="toggle()" class="btn btn-success">add data</button><div collapse="isCollapsed" class="collapsed left-justify"><div ng-controller="addEntryController" class="add-form left-justify"><div class="row"><div class="col-md-12"><h2>add an entry to the database</h2></div></div><div class="row"><div class="col-md-12"><h4>Name</h4></div></div><div class="row"><div class="col-md-12"><label for="name">Name</label><input type="text" id="name" ng-model="name" placeholder="Dewey, Cheatham, &amp; Howe"/></div></div><div class="row"><div class="col-md-12"><h4>Address and Location Details</h4></div></div><div class="row"><div class="col-md-6 left-justify"><label for="address">Address</label><input type="text" id="address" ng-model="address" placeholder="12 Dante's Inferno"/><label for="address">City</label><input type="text" ng-model="locality" placeholder="San Diego"/><label for="region">State/Region</label><input type="text" ng-model="region" placeholder="CA"/></div><div class="col-md-6 left-justify"><label for="postcode">Postcode</label><input type="text" ng-model="postcode" placeholder="92110"/><label for="country">Country</label><input type="text" ng-model="country" placeholder="USA"/></div></div><div class="row"><div class="col-md-12"><h4>Contact Details</h4></div></div><div class="row"><div class="col-md-6"><label for="tel">Phone</label><input type="tel" ng-model="tel" placeholder="555-555-5555"/></div><div class="col-md-6"><label for="tel">Website URL</label><input type="website" id="website" ng-model="website" placeholder="http://www.deweycheatamandhowe.com"/></div></div><div class="row"><div class="col-md-12 right-justify"><button ng-click="add()" class="btn btn-success">submit</button></div></div><div ng-if="messageAdd.text" class="row"><div class="col-md-12 center-justify"><p class="alert {{messageAdd.type}}">{{messageAdd.text}}</p></div></div></div></div></div></fieldset></form><p ng-if="messageGetData.text" class="alert center-justify {{messageGetData.type}}">{{messageGetData.text}}</p></div></div><div class="row results-container"><div class="col-md-12"><table ng-if="data" class="table table-striped table-hover results left-justify"><thead><th>Name</th><th>Address</th><th>City</th><th>State/Region</th><th>Postcode</th><th>Country</th><th>Phone</th><th>URL</th><th>Labels</th><th></th></thead><tbody ng-repeat="entry in data"><td>{{entry.name}}</td><td>{{entry.address}}</td><td>{{entry.locality}}</td><td>{{entry.region}}</td><td>{{entry.postcode}}</td><td>{{entry.country}}</td><td>{{entry.tel}}</td><td>{{entry.website}}</td><td><span ng-repeat="label in entry.category_labels[0]">{{label}};&nbsp;</span></td><td><div ng-controller="editEntryModalController" class="edit-entry-modal"><button ng-click="open(entry)" class="btn btn-primary">edit</button><script type="text/ng-template" id="myModalContent.html"><div class="modal-header"><h2 ng-if="entry.name == name" class="center-justify">{{entry.name}}</h2></div><div class="modal-body"><form class="edit"><div class="row"><div class="col-md-12"><label for="name" class="control-label">Name</label><input type="text" id="name" value="{{entry.name}}"/></div></div><div class="row"><div class="col-md-12"><h3>Address and Location Details</h3></div></div><div class="row"><div class="col-md-6"><label for="address">Address</label><input type="text" id="address" value="{{entry.address}}"/><label for="address">City</label><input type="text" id="locality" value="{{entry.locality}}"/><label for="region">State/Region</label><input type="text" id="region" value="{{entry.region}}"/></div><div class="col-md-6"><label for="postcode">Postcode</label><input type="text" id="postcode" value="{{entry.postcode}}"/><label for="country">Country</label><input type="text" id="country" value="{{entry.country}}"/></div></div><div class="row"><div class="col-md-12"><h3>Contact Details</h3></div></div><div class="row"><div class="col-md-6"><label for="tel">Phone</label><input type="tel" id="tel" value="{{entry.tel}}"/></div><div class="col-md-6"><label for="tel">Website URL</label><input type="website" id="website" ng-model="website" value="{{entry.website}}"/></div></div><div class="row"><div class="col-md-12"></div></div></form></div><div ng-controller="editEntryController" class="modal-footer"><p ng-if="messageEdit.text" class="alert center-justify {{messageEdit.type}}">{{messageEdit.text}}</p><button ng-click="edit(entry)" class="btn btn-primary">submit</button><button ng-click="ok()" class="btn btn-primary">close</button><div class="footer center-justify"><img src="img/hrwlogo1.png"/></div></div></script></div></td></tbody></table></div></div><div class="row"><div class="col-md-12 center-justify"><button ng-click="clear()" ng-if="data" class="btn btn-primary spaced">clear</button></div></div></div>