/*
SPECIFICATION OF THE DATABASE IN SQL

User has become Utilizer because User is a reserved word in sql
Order has become OrderBought because Order is a reserved word in sql
order has become ordinal_order because it is a reserved word in sql

FOREIGN KEYS ARE COMMENTED BECAUSE NOT SUPPORTED BY PLANETSCALE
*/

CREATE TABLE Utilizer (
	email VARCHAR(30) PRIMARY KEY,
	nickname VARCHAR(30) UNIQUE NOT NULL,
	password VARCHAR(30) NOT NULL
);

CREATE TABLE Address (
    province VARCHAR(7),
	nation VARCHAR(30),
	CAP VARCHAR(10),
	street VARCHAR(60),
	city VARCHAR(30) NOT NULL,
	PRIMARY KEY (province, nation, CAP, street)
);

CREATE TABLE Designer (
	email VARCHAR(30) PRIMARY KEY,
	email_payment VARCHAR(30) NOT NULL,
	level SMALLINT NOT NULL CHECK( level >= 1 AND level <= 6 ),
	VAT VARCHAR(30)/*,
	CONSTRAINT fkDesUtilizer FOREIGN KEY (email) REFERENCES Utilizer(email) 
    ON DELETE CASCADE ON UPDATE CASCADE 
    DEFERRABLE INITIALLY DEFERRED */

);

CREATE TABLE InvoiceTo (
	Designer VARCHAR(30) PRIMARY KEY,
	province VARCHAR(7) NOT NULL,
	nation VARCHAR(30) NOT NULL,
	CAP VARCHAR(10) NOT NULL,	
	street VARCHAR(60) NOT NULL /*,
	CONSTRAINT fkInvoiceDes FOREIGN KEY (Designer) REFERENCES Designer(email)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT fkInvoiceAdd FOREIGN KEY (province, nation, CAP, street) REFERENCES Address(province, nation, CAP, street)
    ON DELETE NO ACTION ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED */
);


CREATE TABLE Client (
	email VARCHAR(30) PRIMARY KEY,
    province VARCHAR(7) NOT NULL,
	nation VARCHAR(30) NOT NULL,
	CAP VARCHAR(10) NOT NULL,
	street VARCHAR(60) NOT NULL /*,
	CONSTRAINT fkClientUtilizer FOREIGN KEY (email) REFERENCES Utilizer(email)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT fkClientAdd FOREIGN KEY (province, nation, CAP, street) REFERENCES Address(province, nation, CAP, street)
    ON DELETE NO ACTION ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);


CREATE TABLE WhatsappStickerPack (
	ID INTEGER PRIMARY KEY,
	nr_downloads INTEGER NOT NULL,
	price_digital DECIMAL(18,2) NOT NULL,
	name VARCHAR(60) NOT NULL,
	Designer VARCHAR(30) NOT NULL,
	dt_upload DATE NOT NULL,
	nr_sold INTEGER,
	physical_price DECIMAL(18,2),
	link VARCHAR(200)/*,
	CONSTRAINT fkWhaDes FOREIGN KEY (Designer) REFERENCES Designer(email)
    ON DELETE NO ACTION ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/,
	CHECK ((nr_sold IS NULL AND physical_price IS NULL) OR (nr_sold IS NOT NULL AND physical_price IS NOT NULL))
);

CREATE TABLE Image (
	ID INTEGER,
	ordinal_order INTEGER,
	image_file VARCHAR(150) NOT NULL,
	PRIMARY KEY(ID, ordinal_order),
	UNIQUE(ID, image_file)/*,
	CONSTRAINT fkImWha FOREIGN KEY (ID) REFERENCES WhatsappStickerPack(ID)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);

CREATE TABLE OrderBought(
	ID INTEGER PRIMARY KEY,
	date DATE NOT NULL,
	Client VARCHAR(30) NOT NULL/*,
	CONSTRAINT OrdClient FOREIGN KEY (Client) REFERENCES Client(email)
    ON DELETE NO ACTION ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);

CREATE TABLE PartOf(
	DigitalOrder INTEGER,
	WhatsappStickerPack INTEGER,
	PRIMARY KEY(DigitalOrder, WhatsappStickerPack)/*,
	CONSTRAINT fkPartOrd FOREIGN KEY (DigitalOrder) REFERENCES OrderBought(ID)
    ON DELETE NO ACTION ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT fkPartWha FOREIGN KEY (WhatsappStickerPack) REFERENCES WhatsappStickerPack(ID)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);


CREATE TABLE PrintingEntity(
	VAT VARCHAR(30) PRIMARY KEY,
	name VARCHAR(60) NOT NULL,
    province VARCHAR(7) NOT NULL,
	nation VARCHAR(30) NOT NULL,
	CAP VARCHAR(10) NOT NULL,
	street VARCHAR(60) NOT NULL/*,
	CONSTRAINT fkPrintEAdd FOREIGN KEY (province, nation, CAP, street) REFERENCES Address(province, nation, CAP, street)
    ON DELETE NO ACTION ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);


CREATE TABLE PrintedBy(
	PhysicalOrder INTEGER PRIMARY KEY,
	PrintingEntity VARCHAR(30) NOT NULL/*,
	CONSTRAINT fkPrintOrd FOREIGN KEY (PhysicalOrder) REFERENCES OrderBought(ID)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT fkPrintPrintE FOREIGN KEY (PrintingEntity) REFERENCES PrintingEntity(VAT)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);

CREATE TABLE ProductOf(
	PhysicalOrder INTEGER,
	PhysicalStickerPack INTEGER,
    PRIMARY KEY(PhysicalOrder, PhysicalStickerPack)/*,
	CONSTRAINT fkProdPrint FOREIGN KEY (PhysicalOrder) REFERENCES PrintedBy(PhysicalOrder)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT fkProdWha FOREIGN KEY (PhysicalStickerPack) REFERENCES WhatsappStickerPack(ID)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);

CREATE TABLE ShippingCompany(
	acronym VARCHAR(10) PRIMARY KEY,
	name VARCHAR(60) NOT NULL,
	fee DECIMAL(18,2) NOT NULL
);

CREATE TABLE ShippedBy (
	PhysicalOrder INTEGER PRIMARY KEY,
    province VARCHAR(7) NOT NULL,
	nation VARCHAR(30) NOT NULL,
	CAP VARCHAR(10) NOT NULL,
	street VARCHAR(60) NOT NULL,
	ShippingCompany VARCHAR(10) NOT NULL/*,
	CONSTRAINT fkShipPrint FOREIGN KEY (PhysicalOrder) REFERENCES PrintedBy(PhysicalOrder)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT fkShipAdd FOREIGN KEY (province, nation, CAP, street) REFERENCES Address(province, nation, CAP, street)
    ON DELETE NO ACTION ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT fkShipShipC FOREIGN KEY (ShippingCompany) REFERENCES ShippingCompany(acronym)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);


CREATE TABLE WorkIn(
	ShippingCompany VARCHAR(10),
	Nations CHAR(2),
	PRIMARY KEY(ShippingCompany, Nations)/*,
 	CONSTRAINT fkWorkShipC FOREIGN KEY (ShippingCompany) REFERENCES ShippingCompany(acronym)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);

CREATE TABLE PrintingCompany(
	VAT VARCHAR(30) PRIMARY KEY,
	pec_email VARCHAR(30) NOT NULL/*,
	CONSTRAINT fkPrintCPrintE FOREIGN KEY (VAT) REFERENCES PrintingEntity(VAT)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);

CREATE TABLE LocalPrintingShop(
	VAT VARCHAR(30) PRIMARY KEY,
	phone_number VARCHAR(15) NOT NULL/*,
	CONSTRAINT fkPrintSPrint FOREIGN KEY (VAT) REFERENCES PrintingEntity(VAT)
    ON DELETE CASCADE ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED*/
);

/*
ALTER TABLE Designer
 ADD CONSTRAINT fkDesInvoice FOREIGN KEY (email) REFERENCES InvoiceTo(Designer)
    ON DELETE NO ACTION ON UPDATE CASCADE
    DEFERRABLE INITIALLY DEFERRED;
*/





CREATE OR REPLACE FUNCTION UpdateNrSold() RETURNS TRIGGER AS $$
  BEGIN
   UPDATE WhatsappStickerPack
   SET nr_sold = nr_sold + 1 
   WHERE ID = NEW.WhatsappStickerPack;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewSold
AFTER INSERT ON ProductOf
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE UpdateNrSold();




CREATE OR REPLACE FUNCTION CheckForUtilizers() RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT email FROM Designer INTO w
   WHERE email = NEW.email;
   IF found THEN
      RETURN NEW;
   ELSE
       SELECT email FROM Client INTO w
       WHERE email = NEW.email;
    IF found THEN
      RETURN NEW;
   ELSE
     DELETE FROM Utilizer 
     WHERE Utilizer.email = NEW.email;
     RAISE 'Inserted Utilizer is neither a Designer nor a Client';
     RETURN NULL;
END IF;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewUtilizer
AFTER INSERT ON Utilizer
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForUtilizers();



CREATE OR REPLACE FUNCTION CheckForWhatsappStickerPack () RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT ID FROM Image INTO w
   WHERE ID = NEW.ID;
   IF found THEN
      RETURN NEW;
   ELSE
      DELETE FROM WhatsappStickerPack
      WHERE ID = NEW.ID;
      RAISE 'Inserted WhatsappStickerPack has no Images';
      RETURN NULL;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewWhatsappStickerPack
AFTER INSERT ON WhatsappStickerPack
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForWhatsappStickerPack();




CREATE OR REPLACE FUNCTION CheckForImageNr () RETURNS TRIGGER AS $$
DECLARE w INTEGER;
  BEGIN
   SELECT COUNT(*) FROM Image INTO w
   WHERE ID = NEW.ID;
   IF w < 100 THEN
      RETURN NEW;
   ELSE
      DELETE FROM Image
      WHERE Image.ID = NEW.ID AND Image.ordinal_order = NEW.ordinal_order;
      RAISE 'Current WhatsappStickerPack has reached the maximum of 100 Images';
      RETURN NULL;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewImage
AFTER INSERT ON Image
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForImageNr();




CREATE OR REPLACE FUNCTION CheckForOrderBoughts() RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT DigitalOrder FROM PartOf INTO w
   WHERE DigitalOrder = NEW.ID;
   IF found THEN
      RETURN NEW;
   ELSE
      SELECT PhysicalOrder FROM ProductOf INTO w
       WHERE PhysicalOrder = NEW.ID;
	   IF found THEN
      RETURN NEW;
ELSE
    DELETE FROM OrderBought
    WHERE ID = NEW.ID;
    RAISE 'Inserted OrderBought has no packs referenced (neither in PartOf nor in ProductOf)';
   RETURN NULL;
END IF;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewOrderBought
AFTER INSERT ON OrderBought
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForOrderBoughts();



CREATE OR REPLACE FUNCTION CheckForPartOf () RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT PhysicalOrder FROM PrintedBy INTO w
   WHERE PhysicalOrder = NEW.DigitalOrder;
   IF found THEN
        DELETE FROM PartOf
        WHERE DigitalOrder = NEW.DigitalOrder AND WhatsappStickerPack = NEW.WhatsappStickerPack;
	RAISE 'The inserted PartOf has a reference to an order that is existing as physical';
      RETURN NULL;
   ELSE
       UPDATE WhatsappStickerPack
       SET nr_downloads = nr_downloads + 1 
       WHERE ID = NEW.WhatsappStickerPack;
      RETURN NEW;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewPartOf
AFTER INSERT ON PartOf
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForPartOf();




CREATE OR REPLACE FUNCTION CheckForShippingCompany () RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT ShippingCompany FROM WorkIn INTO w
   WHERE ShippingCompany = NEW.acronym;
   IF found THEN
      RETURN NEW;
   ELSE
      DELETE FROM ShippingCompany 
      WHERE acronym = NEW.acronym;
      RAISE 'The shipping company is not in WorkIn, therefore there is no country in which it works';
      RETURN NULL;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewShippingCompany
AFTER INSERT ON ShippingCompany
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForShippingCompany();




CREATE OR REPLACE FUNCTION CheckForPrintedBy () RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT DigitalOrder FROM PartOf INTO w
   WHERE DigitalOrder = NEW.PhysicalOrder;
   IF NOT found THEN
      SELECT VAT FROM PrintingCompany INTO w
      WHERE VAT = NEW.PrintingEntity;
       IF NOT found THEN
	       RETURN NEW;
       ELSE
            SELECT PhysicalOrder FROM ShippedBy INTO w
            WHERE PhysicalOrder = NEW.PhysicalOrder;
	IF found THEN
	    RETURN NEW;
	ELSE
        DELETE FROM PrintedBy
        WHERE PhysicalOrder = NEW.PhysicalOrder;
	     RETURN NULL;
	RAISE 'The inserted PrintedBy either refers to a physical order printed by a PrintingCompany but which is not shipped';
	END IF;
       END IF;
   ELSE
    DELETE FROM PrintedBy
        WHERE PhysicalOrder = NEW.PhysicalOrder;
	RAISE 'The inserted PrintedBy refers to an order that is digital';
      RETURN NULL;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewPrintedBy
AFTER INSERT ON PrintedBy
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForPrintedBy();



CREATE OR REPLACE FUNCTION CheckForPrintingEntity () RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT VAT FROM PrintingCompany INTO w
   WHERE VAT = NEW.VAT;
   IF found THEN
      RETURN NEW;
   ELSE
         SELECT VAT FROM LocalPrintingShop INTO w
        WHERE VAT = NEW.VAT;
	   IF found THEN
      RETURN NEW;
ELSE
    DELETE FROM PrintingEntity
    WHERE VAT = NEW.VAT;
   RETURN NULL;
   RAISE 'The inserted PrintingEntity is neither a PrintingCompany nor a LocalPrintingShop';
END IF;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewPrintingEntity
AFTER INSERT ON PrintingEntity
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForPrintingEntity();




CREATE OR REPLACE FUNCTION CheckForPrintingCompany () RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT VAT FROM LocalPrintingShop INTO w
   WHERE VAT = NEW.VAT;
   IF found THEN
      DELETE FROM PrintingCompany
      WHERE VAT = NEW.VAT;
      RETURN NULL;
      RAISE 'The inserted PrintingCompany is already a LocalPrintingShop';
   ELSE
      RETURN NEW;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewPrintingCompany
AFTER INSERT ON PrintingCompany
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForPrintingCompany();




CREATE OR REPLACE FUNCTION CheckForLocalPrintingShop() RETURNS TRIGGER AS $$
DECLARE w RECORD;
  BEGIN
   SELECT VAT FROM PrintingCompany INTO w
   WHERE VAT = NEW.VAT;
   IF found THEN
    DELETE FROM LocalPrintingShop 
    WHERE VAT = NEW.VAT;
      RETURN NULL;
     RAISE 'The inserted LocalPrintingShop is already a PrintingCompany';
   ELSE
      RETURN NEW;
   END IF;
  END;
 $$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER NewLocalPrintingShop
AFTER INSERT ON LocalPrintingShop
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE PROCEDURE CheckForLocalPrintingShop();


