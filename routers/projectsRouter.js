const projectsModel = require("../data/helpers/projectModel");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  projectsModel
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve projects" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projectsModel
    .get(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: "project does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "project could not be retrieved." });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  projectsModel
    .getProjectActions(id)
    .then(actions => {
      projectsModel
        .get(id)
        .then(project =>
          project
            ? actions[0]
              ? res.status(200).json(actions)
              : res.status(500).json({ message: "project has no actions" })
            : res.status(404).json({ error: "project does not exist" })
        );
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve project actions" });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  if (newProject.name === "" || !newProject.name) {
    res.status(400).json({ error: "name must exist and include characters" });
  } else if (
    !(typeof newProject.name === "string" || newProject.name instanceof String)
  ) {
    res.status(400).json({ error: "name must be a string" });
  } else if (newProject.name.length > 128) {
    res.status(400).json({ error: "name must not exceed 128 characters" });
  } else if (newProject.description === "" || !newProject.description) {
    res
      .status(400)
      .json({ error: "description must exist and include characters" });
  } else if (
    !(
      typeof newProject.description === "string" ||
      newProject.description instanceof String
    )
  ) {
    res.status(400).json({ error: "description must be a string" });
  } else if (newProject.completed) {
    if (
      !(
        typeof newProject.completed === "boolean" ||
        newProject.completed instanceof Boolean
      )
    ) {
      res.status(400).json({ error: "completed must be a boolean" });
    } else {
      projectsModel
        .insert(newProject)
        .then(project => res.status(200).json(project))
        .catch(err =>
          res.status(500).json({ error: "trouble adding project" })
        );
    }
  } else {
    projectsModel
      .insert(newProject)
      .then(project => res.status(200).json(project))
      .catch(err => res.status(500).json({ error: "trouble adding project" }));
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newProject = req.body;
  projectsModel
    .get(id)
    .then(project => {
      if (!project) {
        releaseEvents.status(400).json({ error: "project does not exist" });
      } else {
        if (newProject.name === "" || !newProject.name) {
          res
            .status(400)
            .json({ error: "name must exist and include characters" });
        } else if (
          !(
            typeof newProject.name === "string" ||
            newProject.name instanceof String
          )
        ) {
          res.status(400).json({ error: "name must be a string" });
        } else if (newProject.name.length > 128) {
          res
            .status(400)
            .json({ error: "name must not exceed 128 characters" });
        } else if (newProject.description === "" || !newProject.description) {
          res
            .status(400)
            .json({ error: "description must exist and include characters" });
        } else if (
          !(
            typeof newProject.description === "string" ||
            newProject.description instanceof String
          )
        ) {
          res.status(400).json({ error: "description must be a string" });
        } else if (newProject.completed) {
          if (
            !(
              typeof newProject.completed === "boolean" ||
              newProject.description instanceof Boolean
            )
          ) {
            res.status(400).json({ error: "completed must be a boolean" });
          } else {
            projectsModel
              .update(id, newProject)
              .then(project => res.status(200).json(project))
              .catch(err =>
                res.status(500).json({ error: "trouble updating project" })
              );
          }
        } else {
          projectsModel
            .update(id, newProject)
            .then(project => res.status(200).json(project))
            .catch(err =>
              res.status(500).json({ error: "trouble updating project" })
            );
        }
      }
    })
    .catch(err => res.status(500).json({ error: "trouble updating project" }));
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await projectsModel.get(id);

  projectsModel.get(id).then(project => {
    if (project) {
      projectsModel
        .remove(id)
        .then(count => {
          res.status(200).json(deleted);
        })
        .catch(err => {
          res.status(500).json({ error: "trouble deleting project" });
        });
    } else {
      res.status(404).json({ error: "project does not exist" });
    }
  });
});

module.exports = router;
