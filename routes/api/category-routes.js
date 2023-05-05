const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include:[Product]
  }).then(categories=>{
      if(categories.length === 0) {
        return res.status(404).json({msg:"no categories in the database"})
      }
      res.json(categories);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred", err});
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {include:[Product]}).then(category=>{
    if(!category) {
      return res.status(404).json({msg:"no categories in the database"})
    }
    res.json(category)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred", err});
  })
  // be sure to include its associated Products
});

// create a new category
router.post('/', (req, res) => {
    /* req.body should look like this...
    {
      category_name: "Video Games",
    }
    */
    Category.create(req.body)
      .then((category) => {
        const successObj = {
          success: "Sucesss",
          category
        }

        res.status(200).json(successObj);
      }).catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      res.status(200).json(category);
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(delCategory=>{
    if(!delCategory) {
      return res.status(404).json({msg:"no category with this id in the database"})
    }
    res.json(delCategory)
  }).catch(err=> {
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  })
});

module.exports = router;
