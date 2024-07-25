exports.ribAtner = {
  getAll: `SELECT * FROM [dbo].[DAF_RIB_ATNER]`, // Retrieve all records from DAF_RIB_ATNER table
  getCount: `SELECT COUNT(*) as count FROM [dbo].[DAF_RIB_ATNER]`, // Count the total number of records in DAF_RIB_ATNER table
  create: `INSERT INTO [dbo].[DAF_RIB_ATNER]
           ([nom]
           ,[rib]
           ,[Redacteur]
           ,[dateCreation])
     VALUES
           (@nom
           ,@rib
           ,@Redacteur
           ,getdate())`, // Create a new record in DAF_RIB_ATNER table with current timestamp
  update: `UPDATE [dbo].[DAF_RIB_ATNER]
        SET [nom] = @nom
      ,[rib] = @rib
      ,[dateModification] = GETDATE()
      ,[ModifierPar] = @ModifierPar
  WHERE id = @id`, // Update a record in DAF_RIB_ATNER table and set modification timestamp
  getOne: `SELECT * FROM [dbo].[DAF_RIB_ATNER] WHERE id = @id`, // Retrieve a single record from DAF_RIB_ATNER table based on id
  getRibAtnerValid: `select *  from DAF_RIB_ATNER 
  where id  not in (select ribAtner from  DAF_Order_virements_Fond  where
  id =@id)
  and id not in (select RibAtnerDestId from DAF_VIREMENTS_Fond where orderVirementFondId =@id)`, // Retrieve valid records from DAF_RIB_ATNER table for virement operations
};

exports.chantier = {
  getAll: "select * From chantier order by id",
  create: "insert into chantier values (@id,@nom)",
  getOne: "select * from chantier where id=@id",
  update: `update chantier set nom =@nom 
  where id = @id`,
  delete: "delete chantier where id=@id",
};
exports.fichierNavitte = {
  getAll: "select * from fichierNavitte",
  create:
    "insert into fichierNavitte values (@id,@NFn,@facture, @dateFacture,@nomFournisseur)",
  getOne: "select * from fichierNavitte where id=@id",
  update: `update fichierNavitte set NFn =@NFn,facture =@facture, dateFacture =@dateFacture, nomFournisseur= @nomFournisseur 
  where id = @id`,
  delete: "delete fichierNavitte where id=@id",
};

exports.utilisateurs = {
  getAll: "select * from utilisateurs",
  create:
    "insert into utilisateurs values (@utilisateurID,@LastName,@FirstName,@Address,@City)",
  getOne: "select * from utilisateurs where utilisateurID=@utilisateurID",
  update: `update UTILISATEURS set LastName =@LastName,FirstName =@FirstName,Address =@Address,City =@City
  where utilisateurID=@utilisateurID`,
  delete: "delete utilisateurs where utilisateurID=@utilisateurID",
};
