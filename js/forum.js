document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('forumPosts')) {
        const initialPosts = [
            {
                id: 1,
                title: "Welcome to Srunix R.E. Forum!",
                author: "Admin",
                date: new Date().toISOString(),
                content: "This is the official forum for Srunix R.E. discussions. Feel free to ask questions, share ideas, or report issues."
            },
            {
                id: 2,
                title: "Installation issues with 1.2.0",
                author: "NewUser",
                date: new Date(Date.now() - 86400000).toISOString(),
                content: "I'm having trouble installing Srunix R.E. on my old laptop. The installer doesn't recognize my hard drive. Any suggestions?"
            },
            {
                id: 3,
                title: "Feature request: Package manager",
                author: "DevContributor",
                date: new Date(Date.now() - 172800000).toISOString(),
                content: "I think Srunix would benefit greatly from a simple package manager. Maybe something like pkgsrc could be ported?"
            }
        ];
        localStorage.setItem('forumPosts', JSON.stringify(initialPosts));
    }

    // Load and display posts
    function loadPosts() {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';
        
        const posts = JSON.parse(localStorage.getItem('forumPosts'));
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'forum-post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <div class="post-meta">Posted by ${post.author} on ${new Date(post.date).toLocaleDateString()}</div>
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

  document.getElementById('submit-post').addEventListener('click', function() {
        const author = document.getElementById('post-author').value.trim();
        const title = document.getElementById('post-title').value.trim();
        const content = document.getElementById('post-content').value.trim();
        
        if (!author || !title || !content) {
            alert('Please fill in all fields');
            return;
        }
        
        const posts = JSON.parse(localStorage.getItem('forumPosts'));
        const newPost = {
            id: posts.length + 1,
            title,
            author,
            date: new Date().toISOString(),
            content
        };
        
        posts.unshift(newPost);
        localStorage.setItem('forumPosts', JSON.stringify(posts));
        
        document.getElementById('post-author').value = '';
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        
        loadPosts();
    });

    loadPosts();
});
