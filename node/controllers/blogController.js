import db from "../db.js";

export const createBlog = (req, res) => {
    console.log(req.file); // Log the file details

    const blog_img = req.file.filename; // Get the filename of the uploaded image
    const { title, description, user_id, published_at } = req.body;
    const created_at = new Date(); // Automatically set created_at to the current date and time

    const values = [title, description, blog_img, user_id, created_at, published_at];
    const sql = "INSERT INTO blog(`title`, `description`, `blog_img`, `user_id`, `created_at`, `published_at`) VALUES (?,?,?,?,?,?)";
    
    db.query(sql, values, (err, result) => {
        if (err) return res.send(err);
        res.send({ statusCode: 200, message: "Blog created successfully!" });
    });
};


export const getBlogs = (req, res) => {
    const sql = "select * from blog";
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                statusCode: 400,
                message: "something went wrong!",
                err: err,
            });
        } else {
            if (data.length === 0) {
                res.send({ statusCode: 300, message: "blogs  not available!!" });
            } else {
                res.send(data);
            }
        }
    });
};



export const getSingleBlog=(req,res)=>{
    const id=parseInt(req.params.id)
    const sql="select * from blog where blog_id=?"
    db.query(sql,id,(err,result)=>{
        if(err){
            res.send(err)
        }else{
            if(result.length===0){
                res.send("user not found")
            }else{
                // res.send(result)
                // const {password,...rest}=result[0]
                res.send(result)
            }
        }
    })
}


export const updateBlog = (req, res) => {

    console.log(req.file); // Log the file details

    const blog_img = req.file.filename; // Get the filename of the uploaded image
    const {
        title, description, user_id, created_at, published_at 
    } = req.body;
    const updated_at = new Date(); 
    const id = parseInt(req.params.id);

    // Corrected SQL query
    const sql = `
        UPDATE blog
        SET title = ?, description = ?, blog_img = COALESCE(?, blog_img), user_id = ?, created_at = ?, updated_at = ?, published_at = ?
        WHERE blog_id = ?
    `;
    
    // Values to be updated in the SQL query
    const values = [title, description, blog_img, user_id, created_at, updated_at,  published_at, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res
                .status(500)
                .send({ statusCode: 500, message: "Something went wrong!!" });
        }

        if (result.affectedRows === 0) {
            return res
                .status(404)
                .send({ statusCode: 404, message: "User not found!!" });
        }

        res.send({ statusCode: 200, message: "User updated successfully!" });
    });
};


export const deleteBlog= (req,res)=>{
    const id = parseInt(req.params.id)
    const sql = "delete from blog where blog_id=?";
    db.query(sql, id, (err, data) => {
        if (err) res.send(err);
        res.send({ data: data, message: "blog deleted sucessfully" });
    });
}