// seemed to need to be outside the namespace, for the fields to populate in the block editor
enum XYCoord {
    //%block='x'
    X,
    //%block='y'
    Y,
}

/**
 * Vector and Matrix classes to work in 2D
 */
//% color=75 weight=100 icon="\uf1ec" block="Math2D"
//% groups=['Vector creation', 'Vector operations', 'Matrix creation', 'Matrix operations', 'Sprite operations']
namespace Math2d {    
    export class Vector {
        _: Array<number>

        private constructor() {
            this._ = []
        }

        private init(x: number, y: number, w: number): Vector {
            this._[0] = x; this._[1] = y; this._[2] = w
            return this
        }

        public static create(x: number, y: number): Vector {
            return new Vector().init(x, y, 1)
        }

        public static zero(): Vector {
            return Vector.create(0, 0)
        }

        //%block="add %vec to %v=variables_get(vec2)"
        //%group='Vector operations'
        public add(v: Vector): any {
            return Vector.create(this._[0] + v._[0], this._[1] + v._[1])
        }

        //%block="from %vec subtract %v=variables_get(vec2)"
        //%group='Vector operations'
        public sub(v: Vector): any {
            return Vector.create(this._[0] - v._[0], this._[1] - v._[1])
        }

        //%block="scale %vec by %s"
        //%group='Vector operations'
        public scale(s: number): any {
            return Vector.create(this._[0] * s, this._[1] * s)
        }

        //%block="compute the dot(scalar) product of %vec and %v=variables_get(vec2)"
        //%group='Vector operations'
        public dot(v: Vector): number {
            return this._[0] * v._[0] + this._[1] * v._[1]
        }

        //%block="compute the squared magnitude of %vec"
        //%group='Vector operations'
        public magSquared(): number {
            return this.dot(this)
        }

        //%block="compute the magnitude of %vec"
        //%group='Vector operations'
        public mag(): number {
            return Math.sqrt(this.dot(this))
        }

        //%block="compute the magnitude of %vec"
        //%group='Vector operations'
        public normalize(): void {
            let magR = 1 / this.mag()
            return this.scale(magR)
        }

        //%block="get %v=variables_get(vec) . %c"
        public getCoord(c: XYCoord): number {
            switch (c) {
                case XYCoord.X: return this.getX()
                case XYCoord.Y: return this.getY()
            }
        }

        //%block="set %v=variables_get(vec) . %c to %val"
        public setCoord(c: XYCoord, val: number) {
            switch (c) {
                case XYCoord.X: this.setX(val)
                case XYCoord.Y: this.setY(val)
            }
        }

        public getX(): number { return this._[0] }
        public setX(val: number): void { this._[0] = val }
        public getY(): number { return this._[1] }
        public setY(val: number): void { this._[1] = val }
    }

    export class Matrix {
        _: Array<number>

        private constructor() {
            this._ = []
        }

        public static identity(): Matrix {
            let ret = new Matrix()
            let _ = ret._
            _[0] = 1; _[1] = 0; _[2] = 0
            _[3] = 0; _[4] = 1; _[5] = 0
            _[6] = 0; _[7] = 0; _[8] = 0
            return ret
        }

        public static rotation(t: number): Matrix {
            let ret = new Matrix()
            let _ = ret._
            _[0] = Math.cos(t); _[1] = Math.sin(t); _[2] = 0
            _[3] = -Math.sin(t); _[4] = Math.cos(t); _[5] = 0
            _[6] = 0; _[7] = 0; _[8] = 1
            return ret
        }

        public static translation(v: Vector): Matrix {
            let ret = Matrix.identity()
            ret._[6] = v._[0]
            ret._[7] = v._[1]
            return ret
        }

        public static stretch(x: number, y: number): Matrix {
            let ret = Matrix.identity()
            ret._[0] = x; ret._[4] = y
            return ret
        }

        public static rotationAndTranslation(t: number, v: Vector): Matrix {
            let ret = Matrix.rotation(t)
            ret.setTranslation(v)
            return ret
        }

        //%block="combine %mat with %m=variables_get(mat2)"
        //%blockSetVariable=mat3
        //%group='Matrix operations'
        public mul(m: Matrix): Matrix {
            let r = new Matrix()
            let _ = this._
            r._[0] = _[0] * m._[0] + _[1] * m._[3]
            r._[1] = _[0] * m._[1] + _[1] * m._[4]
            r._[2] = 0

            r._[3] = _[3] * m._[0] + _[4] * m._[3]
            r._[4] = _[3] * m._[1] + _[4] * m._[4]
            r._[5] = 0

            r._[6] = _[6] * m._[0] + _[7] * m._[3] + _[8] * m._[6]
            r._[7] = _[6] * m._[1] + _[7] * m._[4] + _[8] * m._[7]
            r._[8] = 1
            return r
        }

        //%block="apply %mat to %v=variables_get(vec)"
        //%blockSetVariable=vec
        //%group='Matrix operations'
        public apply(v: Vector): Vector {
            let r = Vector.zero()
            let _ = this._

            //implicit W coordinate in the vector
            r._[0] = v._[0] * _[0] + v._[1] * _[3] + _[6]
            r._[1] = v._[0] * _[1] + v._[1] * _[4] + _[7]

            return r
        }

        //%block="the reverse transform of %mat"
        //%blockSetVariable=mat
        //%group='Matrix operations'
        public reverse(): Matrix {
            let r = new Matrix()
            let _ = this._
            r._[0] = _[0]; r._[1] = _[3]; r._[2] = 0
            r._[3] = _[1]; r._[4] = _[4]; r._[5] = 0
            r._[6] = 0; r._[7] = 0; r._[8] = 1

            let translateBack = Matrix.identity()
            translateBack._[6] = -_[6];
            translateBack._[7] = -_[7];
            return translateBack.mul(r)
        }

        //%block="get %mat's Y-axis"
        //%blockSetVariable=vec
        //%group='Matrix operations'
        public getXAxis(): Vector {
            return Vector.create(this._[0], this._[1])
        }

        //%block="set %mat's X-axis to %v=variables_get(vec)"
        //%group='Matrix operations'
        public setXAxis(v: Vector): void {
            this._[0] = v._[0]; this._[1] = v._[1]; this._[2] = 0
        }

        //%block="get %mat's Y-axis"
        //%blockSetVariable=vec
        //%group='Matrix operations'
        public getYAxis(): Vector {
            return Vector.create(this._[3], this._[4])
        }

        //%block="set %mat's Y-axis to %v=variables_get(vec)"
        //%group='Matrix operations'
        public setYAxis(v: Vector): void {
            this._[3] = v._[0]; this._[4] = v._[1]; this._[5] = 0
        }

        //%block="get %mat's translation"
        //%blockSetVariable=vec
        //%group='Matrix operations'
        public getTranslation(): Vector {
            return Vector.create(this._[6], this._[7])
        }

        //%block="set %mat's translation to %v=variables_get(vec)"
        //%group='Matrix operations'
        public setTranslation(v: Vector) {
            this._[6] = v._[0]; this._[7] = v._[1]; this._[8] = 1
        }
    }

    // FACTORY METHODS

    //%block="create a 2D vector of (%x, %y)"
    //%blockSetVariable=vec
    //%group='Vector creation'
    export function createVector(x: number, y: number) {
        return Vector.create(x, y)
    }

    //%block="create a 2D vector which is all zeroes"
    //%blockSetVariable=vec
    //%group='Vector creation'
    export function createZeroVectorw() {
        return Vector.zero()
    }

    //%block="create a 2D identity matrix"
    //%blockSetVariable=mat
    //%group='Matrix creation'
    export function createIdentityMatrix() {
        return Matrix.identity()
    }

    //%block="create a 2D translation matrix from $v"
    //%blockSetVariable=mat
    //%group='Matrix creation'
    export function createTranslationMatrix(v: Vector) {
        return Matrix.translation(v)
    }

    //%block="create a 2D rotation matrix around $degs degrees"
    //%blockSetVariable=mat
    //%degs.shadow="protractorPicker"
    //%group='Matrix creation'
    export function createRotationMatrixDegrees(degs: number) {
        return Matrix.rotation(degs * 0.01745329252)
    }

    //%block="create a 2D rotation matrix around $rads radians"
    //%blockSetVariable=mat
    //%group='Matrix creation'
    export function createRotationMatrixRadians(rads: number) {
        return Matrix.rotation(rads)
    }

    //%block="create a 2D rotation matrix around $degs degrees with position $v"
    //%blockSetVariable=mat
    //%degs.shadow="protractorPicker"
    //%group='Matrix creation'
    export function createRotationAndTranslationMatrixDegrees(degs: number, v: Vector) {
        return Matrix.rotationAndTranslation(degs * 0.01745329252, v)
    }

    //%block="create a 2D rotation matrix around $rads radian with position $v"
    //%blockSetVariable=mat
    //%degs.shadow="protractorPicker"
    //%group='Matrix creation'
    export function createRotationAndTranslationMatrixRadians(rads: number, v: Vector) {
        return Matrix.rotationAndTranslation(rads, v)
    }

    //%block="create a 2D stretch matrix x-axis by %x, y-axis by %y"
    //%blockSetVariable=mat
    //%group='Matrix creation'
    export function createStretchMatrix(x: number, y: number) {
        return Matrix.stretch(x, y)
    }

    // SPRITE METHODS

    //%block="set sprite %s=variables_get(spr) position to %v=variables_get(vec)"
    //%group='Sprite operations'
    export function setSpritePosition(s: Sprite, v: Vector) {
        s.setPosition(v._[0], v._[1])
    }

    //%block="set sprite %s=variables_get(spr) velocity to %v=variables_get(vec)"
    //%group='Sprite operations'
    export function setSpriteVelocity(s: Sprite, v: Vector) {
        s.setVelocity(v._[0], v._[1])
    }

    //%block="set sprite %s=variables_get(spr) acceleration to %v=variables_get(vec)"
    //%group='Sprite operations'
    export function setSpriteAcceleration(s: Sprite, v: Vector) {
        s.ax = v._[0]
        s.ay = v._[1]
    }
}