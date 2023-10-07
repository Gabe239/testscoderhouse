import productModel from '../dao/models/productModel.js';
export const adminAuthorize = (req, res, next) => {
    const user = req.session.user;

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};

export const userAuthorize = (req, res, next) => {
    const user = req.session.user;

    if (!user || user.role !== 'user') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};

export const premiumAuthorize = (req, res, next) => {
    const user = req.session.user;

    if (!user || user.role !== 'premium') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};

export const canDeleteProductOrUpdate = async (req, res, next) => {
    const user = req.session.user;
    console.log(user);
    if (user && user.role === 'admin') {
        return next();
    }
    if (user && user.role === 'premium') {
        const productId = req.params.productId;
        const isOwner = await checkIfUserIsOwner(user._id, productId);

        if (isOwner) {
            return next();
        } else {
            console.log("It's not the owner");
        }
    }
    
    return res.status(403).json({ message: 'Access denied' });
};

export const premiumAndAdminAuthorize = (req, res, next) => {
    const user = req.session.user;
    

    if (!user || (user.role !== 'premium' || user.role !== 'admin')) {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};

const checkIfUserIsOwner = async (userId, productId) => {
    try {
        const product = await productModel.findById(productId).select('owner');
        if (!product || !product.owner) {
            return false;
        }

        return product.owner.equals(userId);
    } catch (error) {

        console.error('Error checking ownership:', error);
        return false;
    }
};