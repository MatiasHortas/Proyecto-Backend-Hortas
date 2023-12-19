import { usersManager } from "../daos/MongoDB/usersManager.mongo.js";

export const findAll = () => {
  const userModific = usersManager.findAll();
  return userModific;
};

export const findById = (id) => {
  const userModific = usersManager.findById(id);
  return userModific;
};

export const createOne = (obj) => {
  const userModific = usersManager.createOne(obj);
  return userModific;
};

export const deleteOneUser = (id) => {
  const userModific = usersManager.deleteOne(id);
  return userModific;
};

export const updateUser = (id, obj) => {
  const userModific = usersManager.updateOne(id, obj);
  return userModific;
};
