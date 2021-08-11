export const getOne = model => async (req, res) => {
    try {
        const doc = await model.findOne({_id: req.params.id}).exec();
        if(!doc) {
            return res.status(404).end();
        }
        res.status(200).json({data: doc});
    } catch(e) {
        console.error(e);
        res.status(400).end();
    }
}

export const getMany = model => async (req, res) => {
    
} 

export const getAll = model => async (req, res) => {
    try {
        const doc = await model.find({}).exec();
        if(!doc) {
            return res.status(404).end();
        }
        res.status(200).json({data: doc});
    } catch(e) {
        console.error(e);
        res.status(400).end();
    }
}

export const createOne = model => async (req, res) => {
    try  {
        const doc = await model.create(req.body);
        console.log(doc);
        res.status(201).json({data: doc});
    } catch(e) {
        console.error(e);
        res.status(400).end();
    } 
} 

export const updateOne = model => async (req, res) => {
    try {
        const doc = await model.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).exec();
        if(!doc) {
            return res.status(400).end();
        }
        res.status(200).json({data: doc});
    }  catch(e) {
        console.error(e);
        res.status(400).end();
    }
} 

export const removeOne = model => async (req, res) => {
    try {
        const doc = await model.findOneAndRemove({_id: req.params.id}).exec();
        if(!doc) {
            return res.status(400).end();
        }
        res.status(200).json({data: doc});
    }  catch(e) {
        console.error(e);
        res.status(400).end();
    }
} 


export const crudControllers = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model),
    getAll: getAll(model)
})
