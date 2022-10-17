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
      posts.id, posts.user_id, posts.images, posts.description, posts.created_at,
      users.username AS user_username, users.profile_picture AS user_profile_picture,
      user_post_likes.id AS is_user_liked,
      (SELECT COUNT(*) FROM post_likes WHERE post_id = posts.id) AS total_likes
    FROM posts
    JOIN users ON users.id = posts.user_id
    LEFT JOIN post_likes AS user_post_likes ON user_post_likes.post_id = posts.id AND user_post_likes.user_id = $1`,
      [userID]
    );

    return { getPosts: getPosts.rows };
  }
}

module.exports = PostsRepository;
