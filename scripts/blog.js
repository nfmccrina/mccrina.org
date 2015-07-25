function BlogEngine() {
    var self = this;
    
    var blog_posts = new BlogPostList();
    
    this.LoadBlogPosts = function() {
        $.getJSON("/php/get_blog_posts.php", function( data ) {
            $.each(data.blog_posts, function(key, val) {
                blog_posts.AddBlogPost(val);
            });
            
            self.RenderBlogContent( $( "#blog_content" ) );
        });
    }

    this.PostNewComment = function(post_id, comment_author, comment_text) {
        blog_posts.AddComment(post_id, comment_author, comment_text);

        $.post("/php/add_blog_comment.php", { post_id : post_id, author : comment_author, text : comment_text } );

        self.RenderBlogContent( $( "#blog_content" ) );
    }
    
    this.RenderBlogContent = function(domelement) {
        domelement.empty();

        for (var i = 0; i < blog_posts.Size(); i++) {
            var post = blog_posts.At(i);

            var article_element = $('<article id="post_' + post.id + '" class="blog_entry"></article>');
            domelement.append(article_element);
            var header_element = $('<header></header>');
            article_element.append(header_element);
            var title_element = $('<h1></h1>');
            header_element.append(title_element);
            var author_element = $('<p></p>');
            header_element.append(author_element);
            var content_element = $('<section class="post_content"></section>');
            article_element.append(content_element);
            var text_element = $('<p></p>');
            content_element.append(text_element);

            var comment_section = $('<section class="post_comments"></section>');
            article_element.append(comment_section);

            for (var j = 0; j < post.comments.length; j++)
            {
                var comment_element = $('<article id="comment_' + post.id + j + '" class="blog_comment"></article>');
                comment_section.append(comment_element);

                var comment_author = $('<header></header>');
                comment_element.append(comment_author);

                var comment_author_text = $('<h1></h1>');
                comment_author.append(comment_author_text);
                comment_author_text.text(post.comments[j].name);

                var comment_content = $('<section class="comment_content"></section>');
                comment_element.append(comment_content);

                var comment_text = $('<p></p>');
                comment_content.append(comment_text);
                comment_text.text(post.comments[j].text);

            }

            comment_section.append('<p>Leave a comment!</p>');

            var new_comment_form = $('<form class="comment_form" id="comment_form_"' + post.id + '" data-id="' + post.id + '"></form>');
            comment_section.append(new_comment_form);

            new_comment_form.append($('<label for="comment_author_' + post.id + '">Name:</label>'));
            var new_comment_author = $('<input id="comment_author_' + post.id + '" type="text" name="comment_author" />');
            new_comment_form.append(new_comment_author);

            new_comment_form.append($('<label for="textarea_' + post.id + '">Comment:</label>'));
            var new_comment_entry = $('<textarea id="textarea_' + post.id + '" name="comment_text" rows="5" cols="25"></textarea>');
            new_comment_form.append(new_comment_entry);

            var comment_submit = $('<input id="submit_' + post.id + '" type="submit" value="Post Comment" />');
            new_comment_form.append(comment_submit);

            var footer_element = $('<footer></footer>');
            article_element.append(footer_element);
            var dates_element = $('<p class="dates_display"></p>');
            footer_element.append(dates_element);

            title_element.text(post.title);
            author_element.html('by <span class="author_text">' + post.author + "</span>");
            text_element.text(post.content);

            var datestring = "";
            datestring = datestring + "created on: " + post.createdate;

            if (post.createdate != post.modifieddate) {
                datestring = datestring + "<br />last edited on: " + post.modifieddate;
            }

            dates_element.html(datestring);
        }

        $( '.comment_form' ).submit(function(ev) {
            ev.preventDefault();

            var post_id = parseInt(ev.target.dataset.id);
            var comment_author = $( '#comment_author_' + post_id ).val();
            var comment_text = $( '#textarea_' + post_id ).val();

            self.PostNewComment(post_id, comment_author, comment_text);

            return false;
        });
    }
}

function BlogPostList() {
    var self = this;
    var posts = [];
    
    this.PrintList = function() {
        var idstring = "";
        
        for (var i = 0; i < posts.length; i++)
        {
            idstring = idstring + posts[i].id + "\n";
        }
        
        alert(idstring);
    }

    this.At = function(index) {
        if (index >= posts.length || index < 0) {
            return null;
        }
        else {
            return posts[index];
        }
    }

    this.AddComment = function(post, author, comment) {
        for (var i = 0; i < posts.length; i++)
        {
            if (posts[i].id == post) {
                posts[i].comments.push( { "name" : author, "text" : comment } );
            }
        }
    }

    this.Size = function() {
        return posts.length;
    }
    
    this.AddBlogPost = function(blog_post) {
        posts.push(blog_post);
    }
    
    this.SortBlogPosts = function(criteria) {
        var compfunc = function() {}
        
        if (criteria == "id") {
            compfunc = function(a, b) {
                return a.id - b.id;
            }
        }
        else if (criteria == "createdate") {
            compfunc = function(a, b) {
                return new Date(a.createdate) - new Date(b.createdate);
            }                
        }
        else if (criteria == "modifieddate") {
            compfunc = function(a, b) {
                return new Date(a.modifieddate) - new Date(b.modifieddate);
            }   
        }
        else if (criteria == "author") {
            compfunc = function(a, b) {
                return (a.author > b.author) - (a.author < b.author);
            }
        }
        else {
            return;
        }
        
        posts.sort(compfunc);
    }
}
