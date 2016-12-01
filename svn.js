var	fs		= require('fs'),
	co 		= require('co'),
	path	= require('path'),
	Client 	= require('svn-spawn')

var svnModel = (function(){
	// Instantiating the SVN instance.
	// For more options, check the "svn-spawn" page.
	var client = new Client({
	    cwd: '/Your-path' //Your SVN path here
	})
	
	var defaultMessage = "ByteFence Dashboard commit"
	
	function* update () {
		return new Promise(function (resolve, reject) {
			console.log('About to update SVN')
			client.update(function(err, data) {
				var message, resolution
				
				if (err) {
					message = 'There was an error: ' + err
					resolution = reject
				} else {
					message = 'Updated SVN successfully'
					resolution = resolve
				}
				
				console.log(message)
				resolution()
			})
		})
	}
	
	function* commitAll () {
		return new Promise(function (resolve, reject) {
			console.log('About to commit all local changes')
			try {
				client.addLocal(function(err, data) {
					client.commit(defaultMessage, function(err, data) {
						console.log('Commited successfully!')
						resolve()
					})
				})
			} catch (e) {
				throw new Error(e)
				reject()
			}	
		})
	}
	
	function* cleanup () {
		return new Promise(function (resolve, reject) {
			console.log('Running cleanup on SVN')
			try {
				client.cmd(['cleanup'], function(err, data) {
					console.log('Cleanup done!')
					resolve()
				})
			} catch (e) {
				throw new Error(e)
				reject()
			}	
		})
	}
	
	return {
		update: co.wrap(function* () {
			yield update()
		}),
		commitAll: co.wrap(function* () {
			yield commitAll()
		}),
		cleanup: co.wrap(function* () {
			yield cleanup()
		})
	}
})()

module.exports = svnModel