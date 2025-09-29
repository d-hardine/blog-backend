const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function getArticles(categoryName, searchTerm) {
    if(!categoryName && !searchTerm) { //if the user just open the homepage without clicking category tag and searching something
        return prisma.post.findMany({
            where: {
                published: true
            },
            include: {
                categories: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else if(!searchTerm && categoryName) { //if the user clicking  the category tag
        return prisma.post.findMany({
            where: {
                published: true,
                categories: {
                    every: {
                        name: categoryName
                    }
                }
            },
            include: {
                categories: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else {
        return prisma.post.findMany({ //if the user about to search something
            where: {
                published: true,
                title: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            },
            include: {
                categories: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
}

async function getCategories() {
    return prisma.category.findMany()
}

async function getArticle(articleId) {
    return prisma.post.findFirst({
        where: {
            id: articleId
        },
        include: {
            author: true,
            categories: true,
        },
    })
}

async function getComments(articleId) {
    return prisma.comment.findMany({
        where: {
            postId: articleId
        },
        include: {
            author: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

async function addNewComment(articleId, userId, newComment) {
    return prisma.comment.create({
        data: {
            postId: articleId,
            body: newComment,
            authorId: userId
        },
    })    
}

async function createNewUser(firstName, lastName, username, email, hashedPassword) {
    return await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        }
    })
}

async function lookupUser(username) {
    return await prisma.user.findUnique({
        where: {
            username: username
        },
    })
}

async function deleteComment(commentId) {
    return prisma.comment.delete({
        where: {
            id: commentId
        }
    })
}

async function editComment(commentId, editComment) {
    return prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            body: editComment
        }
    })
}

async function getEditorArticles(userId) {
    return prisma.post.findMany({
        where: {
            authorId: userId
        },
        include: {
            categories: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
}

async function createArticle(title, body, categoryId, userId) {
    return prisma.post.create({
        data: {
            title: title,
            body: body,
            authorId: userId,
            categories: {
                connect: [{id: categoryId}],
            }
        },
    })
}

async function updateArticle(title, body, categoryId, articleId) {
    return prisma.post.update({
        where: {
            id: articleId
        },
        data: {
            title: title,
            body: body,
            categories: {
                set: [{id: categoryId}]
            }
        }
    })    
}

async function updatePublish(articleId, newBool) {
    const stopUpdatedAt = await prisma.post.findFirst({
        where: {
            id: articleId
        },
        select: {
            updatedAt: true
        }
    })
    return prisma.post.update({
        where: {
            id: articleId
        },
        data: {
            published: newBool,
            updatedAt: stopUpdatedAt.updatedAt
        }
    })
}

async function deleteArticle(articleId) {
    return prisma.post.delete({
        where: {
            id: articleId
        }
    })
}

module.exports = {
    getArticles,
    getCategories,
    getArticle,
    getComments,
    addNewComment,
    createNewUser,
    lookupUser,
    deleteComment,
    editComment,
    getEditorArticles,
    createArticle,
    updateArticle,
    updatePublish,
    deleteArticle,
}