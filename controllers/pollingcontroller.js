import Questions from "../models/questions.js";
import Options from "../models/options.js";

export async function createQuestion(req, res) {
  try {
    let question = await Questions.create({
      title: req.body.title,
      options: [],
    });
    return res.status(200).json({
      message: "Question Created Successfully",
      data: {
        question,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error...",
    });
  }
}

export async function createOption(req, res) {
  try {
    let option = await Options.create({
      text: req.body.text,
      votes: req.body.votes,
    });
    await Options.findByIdAndUpdate(option._id, {
      link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
    });
    await Questions.findByIdAndUpdate(req.params.id, {
      $push: { options: option._id },
    });
    return res.status(200).json({
      message: "Option Created Successfully",
      data: {
        option,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error...",
    });
  }
}

export async function deleteQuestion(req, res) {
  try {
    let question = await Questions.findByIdAndDelete(req.params.id);
    await Options.deleteMany({
      _id: { $in: question.options },
    });
    if (question) {
      return res.status(200).json({
        message: "Question Deleted Successfully",
        question: {
          title: question.title,
        },
      });
    } else {
      return res.status(200).json({
        message: "Question didn't find",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error...",
    });
  }
}

export async function deleteOption(req, res) {
  try {
    let option = await Options.findByIdAndDelete(req.params.id);

    await Questions.updateOne(
      { options: req.params.id },
      {
        $pull: {
          options: req.params.id,
        },
      }
    );
    if (option) {
      return res.status(200).json({
        message: "Option Deleted Successfully",
        Option: {
          title: option.text,
        },
      });
    } else {
      return res.status(200).json({
        message: "Option didn't find",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error...",
    });
  }
}

export async function addVote(req, res) {
  try {
    let option = await Options.findById(req.params.id);
    if (option) {
      await Options.findByIdAndUpdate(req.params.id, {
        votes: option.votes + 1,
      });
      return res.status(200).json({
        message: "Votes Incremented Successfully",
      });
    } else {
      return res.status(200).json({
        message: "No Option Found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error...",
    });
  }
}

export async function getQuestion(req, res) {
  try {
    let question = await Questions.findById(req.params.id).populate("options");
    if (question) {
      return res.status(200).json({
        id: question._id,
        title: question.title,
        options: question.options,
      });
    } else {
      return res.status(200).json({
        message: "No Question Found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error...",
    });
  }
}
