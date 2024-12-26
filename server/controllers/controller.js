import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, {answers} from '../database/data.js';


  
/**get all questions */
export async function getQuestions(req, res){
   try {
   const q = await Questions.find();
   res.json(q)
   } catch (error) {
    res.json({ error })
   }
}

/**insert all question */
export async function insertQuestions(req, res){

 
        Questions.insertMany({  questions,  answers })
        .then((data) => {
          res.json({ msg: "Data Saved Successfully...!"})
        })
        .catch((error) => {
          res.json({ error: error.message });
        });
      
      
}


/** delete all questions */
export async function dropQuestions(req, res){
   try {
    await Questions.deleteMany();
    res.json({ msg: "Questions deleted Successfully...!"});
   } catch (error) {
    res.json({ error })
   }
}

/**get all result */
export async function getResult(req, res){
    try {
        const r = await Results.find()
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}
/**post all result */
export async function storeResult(req, res) {
  try {
    const {  username, result, attempts, points, achived } = req.body;
    console.log("Request Body:", req.body);
    if (!username || !result) {
      return res.status(400).json({ error: "Username and result are required." });
    }
    

    // Save the result to the database
    const data = await Results.create({ username, result, attempts, points, achived });
    

    // Send success response
    res.status(201).json({
      msg: "Result saved successfully!",
      data,
    });
  } catch (error) {
    console.error("Error saving result:", error);

    // Send error response
    res.status(500).json({
      error: error.message || "Failed to save result. Please try again later.",
    });
  }
}


/**delete all request */
export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({msg: "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}