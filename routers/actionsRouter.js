const projectsModel = require("../data/helpers/projectModel");
const actionModel = require("../data/helpers/actionModel");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve actions" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  actionModel
    .get(id)
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ error: "action does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "action could not be retrieved." });
    });
});

// project_id: number, required, must be the id of an existing project.
// description: string, up to 128 characters long, required.
// notes: string, no size limit, required. Used to record additional notes or requirements to complete the action.
// completed: boolean to indicate if the action has been completed, not required

router.post("/", (req, res) => {
  const newAction = req.body;

  if (newAction.project_id) {
    projectsModel.get(req.body.project_id).then(project => {
      if (!project) {
        res.status(400).json({
          eror: "project_id must equal a current and valid project id"
        });
      } else {
        if (newAction.description === "" || !newAction.description) {
          res
            .status(400)
            .json({ error: "description must exist and include characters" });
        } else if (
          !(
            typeof Action.description === "string" ||
            newAction.description instanceof String
          )
        ) {
          res.status(400).json({ error: "description must be a string" });
        } else if (newAction.description.length > 128) {
          res
            .status(400)
            .json({ error: "description must not exceed 128 characters" });
        } else if (newAction.notes === "" || !newAction.notes) {
          res
            .status(400)
            .json({ error: "notes must exist and include characters" });
        } else if (
          !(
            typeof newAction.notes === "string" ||
            newAction.notes instanceof String
          )
        ) {
          res.status(400).json({ error: "notes must be a string" });
        } else if (newAction.completed) {
          if (
            !(
              typeof newAction.completed === "boolean" ||
              newAction.completed instanceof Boolean
            )
          ) {
            res.status(400).json({ error: "completed must be a boolean" });
          } else {
            actionModel
              .insert(newAction)
              .then(action => res.status(200).json(action))
              .catch(err =>
                res.status(500).json({ error: "trouble adding action" })
              );
          }
        } else {
          action
            .insert(newAction)
            .then(action => res.status(200).json(action))
            .catch(err =>
              res.status(500).json({ error: "trouble adding action" })
            );
        }
      }
    });
  } else {
    res.status(400).json({ error: "project_id must be included" });
  }
});

router.put("/:id", (req, res) => {
  const newAction = req.body;
  const { id } = req.params;

  if (newAction.project_id) {
    projectsModel.get(req.body.project_id).then(project => {
      if (!project) {
        res.status(400).json({
          eror: "project_id must equal a current and valid project id"
        });
      } else {
        if (newAction.description === "" || !newAction.description) {
          res
            .status(400)
            .json({ error: "description must exist and include characters" });
        } else if (
          !(
            typeof newAction.description === "string" ||
            newAction.description instanceof String
          )
        ) {
          res.status(400).json({ error: "description must be a string" });
        } else if (newAction.description.length > 128) {
          res
            .status(400)
            .json({ error: "description must not exceed 128 characters" });
        } else if (newAction.notes === "" || !newAction.notes) {
          res
            .status(400)
            .json({ error: "notes must exist and include characters" });
        } else if (
          !(
            typeof newAction.notes === "string" ||
            newAction.notes instanceof String
          )
        ) {
          res.status(400).json({ error: "notes must be a string" });
        } else if (newAction.completed) {
          if (
            !(
              typeof newAction.completed === "boolean" ||
              newAction.completed instanceof Boolean
            )
          ) {
            res.status(400).json({ error: "completed must be a boolean" });
          } else {
            actionModel
              .update(id, newAction)
              .then(action => res.status(200).json(action))
              .catch(err =>
                res.status(500).json({ error: "trouble updating action" })
              );
          }
        } else {
          action
            .insert(id, newAction)
            .then(action => res.status(200).json(action))
            .catch(err =>
              res.status(500).json({ error: "trouble updating action" })
            );
        }
      }
    });
  } else {
    res.status(400).json({ error: "project_id must be included" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await actionModel.get(id);

  actionModel.get(id).then(action => {
    if (action) {
      actionModel
        .remove(id)
        .then(count => {
          res.status(200).json(deleted);
        })
        .catch(err => {
          res.status(500).json({ error: "trouble deleting action" });
        });
    } else {
      res.status(404).json({ error: "action does not exist" });
    }
  });
});

module.exports = router;
