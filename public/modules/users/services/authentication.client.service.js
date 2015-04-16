'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user,

			meetsRole: function(role)
			{
				return (_this.user.roles.indexOf(role) !== -1);
			},

			meetsAnyRole: function(roles)
			{
				for (var i = 0; i !== roles.length; ++i)
				{
					if (_this.meetsRole(roles[i]))
						return true;
				}

				return false;
			}
		};

		return _this._data;
	}
]);