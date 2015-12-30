process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../src/server/app');
var Post = require('../src/server/models/posts');
var should = chai.should();
chai.use(chaiHTTP);
describe('Blog Routes', function() {

  Post.collection.drop();

  var id, post;

  beforeEach(function(done){
    post = {
      title: 'First Post',
      createDate: Date.now(),
      post: 'This is a test post.',
      comments: [
        {
          comment: 'Your post sucks.',
          author: 'Testy',
          createDate: Date.now()+1000
        }
      ]
    };

    var newPost = new Post(post);

    id = newPost._id;

    newPost.save(function(err){
      done();
    });

  }); // ends beforeEach

  afterEach(function(done){
    Post.collection.drop();
    done();
  });

  it('Should get ALL blog posts', function(done) {
    chai.request(server)
      .get('/api/posts')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].title.should.be.a('string');
        res.body[0].title.should.be.equal('First Post');
        res.body[0].post.should.be.a('string');
        res.body[0].post.should.be.equal('This is a test post.');
        res.body[0].comments.should.be.a('array');
        res.body[0].comments[0].should.be.a('object');
        res.body[0].comments[0].comment.should.be.a('string');
        res.body[0].comments[0].comment.should.be.equal('Your post sucks.');
        res.body[0].comments[0].author.should.be.a('string');
        res.body[0].comments[0].author.should.be.equal('Testy');
        done();
      });
  });

  it('Should get a single blog post', function(done) {
    chai.request(server)
      .get('/api/post/'+id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.title.should.be.a('string');
        res.body.title.should.be.equal('First Post');
        res.body.post.should.be.a('string');
        res.body.post.should.be.equal('This is a test post.');
        res.body.comments.should.be.a('array');
        res.body.comments[0].should.be.a('object');
        res.body.comments[0].comment.should.be.a('string');
        res.body.comments[0].comment.should.be.equal('Your post sucks.');
        res.body.comments[0].author.should.be.a('string');
        res.body.comments[0].author.should.be.equal('Testy');
        done();
      });
  });

  it('Should create a single blog post', function(done) {
    chai.request(server)
      .post('/api/post')
      .send(post)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.title.should.be.a('string');
        res.body.title.should.be.equal('First Post');
        res.body.post.should.be.a('string');
        res.body.post.should.be.equal('This is a test post.');
        res.body.comments.should.be.a('array');
        res.body.comments[0].should.be.a('object');
        res.body.comments[0].comment.should.be.a('string');
        res.body.comments[0].comment.should.be.equal('Your post sucks.');
        res.body.comments[0].author.should.be.a('string');
        res.body.comments[0].author.should.be.equal('Testy');
        done();
      });
  });

  it('Should correctly update a single blog post', function(done) {
    post.post = 'Updated post';
    chai.request(server)
      .put('/api/post')
      .send(post)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.title.should.be.a('string');
        res.body.title.should.be.equal('First Post');
        res.body.post.should.be.a('string');
        res.body.post.should.be.equal('Updated post');
        res.body.comments.should.be.a('array');
        res.body.comments[0].should.be.a('object');
        res.body.comments[0].comment.should.be.a('string');
        res.body.comments[0].comment.should.be.equal('Your post sucks.');
        res.body.comments[0].author.should.be.a('string');
        res.body.comments[0].author.should.be.equal('Testy');
        done();
      });
  });

  it('Should correctly remove a single blog post', function(done) {
    chai.request(server)
      .delete('/api/post/'+id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.title.should.be.a('string');
        res.body.title.should.be.equal('First Post');
        res.body.post.should.be.a('string');
        res.body.post.should.be.equal('This is a test post.');
        res.body.comments.should.be.a('array');
        res.body.comments[0].should.be.a('object');
        res.body.comments[0].comment.should.be.a('string');
        res.body.comments[0].comment.should.be.equal('Your post sucks.');
        res.body.comments[0].author.should.be.a('string');
        res.body.comments[0].author.should.be.equal('Testy');
        done();
      });
  });

});
