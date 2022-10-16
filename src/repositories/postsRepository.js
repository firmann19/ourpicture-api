const dbConn = require("../../config/db_connection");

class PostsRepository {
  static async create({ images, description, userID }) {
    const createdPost = await dbConn.query(
      "INSERT INTO posts (images, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [images, description, userID]
    );

    return { createdPost: createdPost.rows[0] };
  }

  static async getAll({ userID }) {
    const getPosts = await dbConn.query(
      `SELECT
         post.id, posts.images, posts.description, posts.created_at,
        users.username AS user_username, users.profile_picture AS user_profile_picture,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = posts.id) AS total_likes
      FROM posts
      LEFT JOIN users ON users.id = posts.user_id
      LEFT JOIN post_likes ON post_likes.post_id = posts.id AND post_likes.user_id = $1`,
      [userID]
    );

    return { getPosts: getPosts.rows };
  }
}

module.exports = PostsRepository;
