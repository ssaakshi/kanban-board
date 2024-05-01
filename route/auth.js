const express = require('express');
const router = express.Router();

require('../db/conn');
const Schema = require("../model/userSchema");

router.get("/", (req, res) => {
    res.send("hello from router");
})

router.post("/add", (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(422).json({ error: "Please add the task with required fields" });
    }

    Schema.Task.findOne({ title: title })
        .then((taskExist) => {
            if (taskExist) {
                return res.status(422).json({ error: "Task with same title already exist" });
            }

            const task = new Schema.Task(req.body);
            task.save()
                .then(() => {
                    return res.status(201).json({ message: "task successfully added" });
                }).catch((err) => {
                    return res.status(500).json({ error: "failed to add" })
                })
        }).catch((err) => {
            return res.status(500).json({ error: "main fail" })
        })
});

router.post("/delete", (req, res) => {
    const { title } = req.body;
    Schema.Task.deleteOne({ title: title })
        .then(() => {
            return res.status(201).json({ message: "successfully deleted" });
        })
        .catch((err) => {
            return res.status(422).json({ error: "Task not deleted" });
        })
});

router.post("/deleteColumn", (req, res) => {
    const { listTitle } = req.body;
    Schema.ColName.deleteOne({ col: listTitle })
        .then(() => {
            return res.status(201).json({ message: "successfully deleted" });
        })
        .catch((err) => {
            return res.status(422).json({ error: "Task not deleted" });
        })
});



router.post("/update", (req, res) => {
    const { title, description } = req.body;
    Schema.Task.updateOne(
        { title: title },
        {
            $set: { description: description }
        }).then(() => {
            return res.status(201).json({ message: "successfully updated" });
        })
        .catch((err) => {
            return res.status(422).json({ error: "Task not updated" });
        })
});

router.get("/data", async (req, res) => {
    const tasks = await Schema.Task.find({ col: req.query.col });
    res.send(tasks);
});


router.get("/column", async (req, res) => {
    const columns = await Schema.ColName.find({});
    res.send(columns);
});


router.post("/column", async (req, res) => {
    const {name}= req.body;

    Schema.ColName.findOne({ name: name })
        .then((columnExist) => {
            if (columnExist) {
                return res.status(422).json({ error: "Column with same name already exist" });
            }

            const column = new Schema.ColName(req.body);
            column.save()
                .then(() => {
                    return res.status(201).json({ message: "column successfully added" });
                }).catch((err) => {
                    return res.status(500).json({ error: "failed to add" })
                })
        }).catch((err) => {
            return res.status(500).json({ error: "main fail" })
        })
   

});

module.exports = router;
