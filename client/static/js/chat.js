var ChatServer = function(endpoint) {
    this.endpoint = endpoint;
    this.socket = undefined;

    this.color_count = 5;
};

ChatServer.prototype = {
    send: function(params) {
        this.socket.send(JSON.stringify(params));
    },

    login: function(handle) {
        var me = this;
        this.handle = handle;
        this.socket = new WebSocket('ws://'+this.endpoint+'/');
        this.socket.onopen = function () {
            me.log("Chat connection opened");
            me.send({'type': 'login', 'handle': handle});
        };
        this.socket.onmessage = function(event) {
            message = $.parseJSON(event.data);
            switch(message.type) {
                case 'message':
                    me.log(message.message, message.handle, message.id);
                    break;
                case 'user_joined':
                    me.log(message.handle + " has joined the channel");
                    me.add_user(message.id, message.handle);
                    break;
                case 'user_left':
                    me.log(message.handle + " has left the channel");
                    me.remove_user(message.id);
                    break;
                case 'userlist':
                    $.each(message.users, function(idx, user) {
                        me.add_user(user.id, user.handle);
                    });
                    break;
            }
        };
        this.socket.onclose = function () {
            me.log("Chat connection closed");
        };
    },

    add_user: function(id, handle) {
        var color_id = id % this.color_count,
            $el = $('<li id="user-'+id+'" class="list-group-item user-color-'+color_id+'">'+handle+'</li>').hide();
        $('#userlist').append($el);
        $el.fadeIn(500, this.update_count);
    },

    remove_user: function(id) {
        var $el = $('#userlist #user-'+id),
            me = this;
        $el.fadeOut(500, function() {
            $(this).remove();
            me.update_count();
        });
    },

    update_count: function() {
        $('#usercount').text($('#userlist li').length);
    },

    message: function(message) {
        this.send({'type': 'message', 'message': message});
    },

    timestamp: function() {
        var date = new Date(),
            hrs = date.getHours(),
            mins = date.getMinutes(),
            secs = date.getSeconds();
        return (hrs < 10 ? "0" : "") + hrs + ":" + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
    },

    log: function(msg, user, id) {
        var system = user == undefined,
            color_id = id % this.color_count,
            $ts = $('<span class="time">').html(this.timestamp() + ': '),
            $message = $('<div class="message">').append($ts),
            $content = $('<span>');
        if(system) {
            $message.addClass('message-system');
            $content.html(msg);
        } else {
            var $user = $('<span class="user">').html(user + ': ');
            $content.addClass('user-color-'+color_id).append($user).append(msg);
        }
        $message.append($content);
        $('#log').append($message);
        $('#log').scrollTop($('#log')[0].scrollHeight);
    }
};

$(function() {

	$('#handle-dlg').modal('show')
		.on('shown.bs.modal', function() {
			$('#handle').focus();
			$('#handle-form').submit(function() {
				$('#handle-dlg').modal('hide');
				return false;
			});
		})
		.on('hide.bs.modal', function() {
			var handle = $('#handle').val();
			window.chat.login(handle);
			$('#chat-panel').fadeIn();
			$('#chat').focus();
			$('#my-handle').html(handle);
		});

	$('#chatform').submit(function() {
        window.chat.message($('#chat').val());
	    $('#chat').val('');
	    return false;
	});

});
